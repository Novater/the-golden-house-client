/* eslint-disable */

import { React, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import PageModal from './components/modal'
import Page from './views/page'
import './stylesheets/index.scss'
import _generate from './functions/index'
import axios from 'axios'
import LoginPage from './views/loginPage'
import EditSideBar from './components/editsidebar'
import store from './store/store'
import { checkLoggedIn } from './store/reducers/authSlice'
import { savePosts } from './store/reducers/postSlice'
import { connect } from 'react-redux'

const EDIT_CONSTANTS = require('./constants/editConstants')
const POST_CONSTANTS = require('./constants/postConstants')

axios.defaults.withCredentials = true
require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editTablePermissions: ['ADMIN'],
      pages: [],
    }
  }

  async componentDidMount() {
    store.dispatch(checkLoggedIn)
    try {
      const SERVER_URL = _generate.serverFunctions.getServerURL()
      const loadedPages = await axios.get(`${SERVER_URL}/page`)
      this.setState({ pages: loadedPages.data })
    } catch (error) {
      console.log(error)
    }
  }

  updateEditMode = () => {
    store.dispatch({ type: EDIT_CONSTANTS.SHOW_EDIT_MODAL })
  }

  saveContent = () => {
    store.dispatch(savePosts)
  }

  closeSaveModal = () => {
    store.dispatch({ type: POST_CONSTANTS.CLOSE_SAVE_MODAL })
  }

  changeEditMode = () => {
    store.dispatch({ type: EDIT_CONSTANTS.CHANGE_EDIT_MODE })
  }

  closeEditModal = () => {
    store.dispatch({ type: EDIT_CONSTANTS.CLOSE_EDIT_MODAL })
  }

  createExactPage = (
    path,
    { title, tabName, backgroundImage, navBar, _id },
  ) => {
    let backgroundURL
    try {
      backgroundURL = require(`${backgroundImage}`)
    } catch (e) {
      backgroundURL = null
    }

    return (
      <Route key={`route-${_id}`} exact path={path}>
        <Page
          key={_id}
          title={title}
          tabName={tabName}
          editTablePermissions={this.state.editTablePermissions}
          backgroundImage={backgroundURL}
          navBar={navBar}
        />
      </Route>
    )
  }

  render() {
    const { tab, loggedIn, editorType, editorData, saveFailed } = this.props

    return (
      <div className="app-container">
        {tab !== 'fullpage-table' ? (
          <Navbar
            className="main-nav"
            showProfile={true}
            edit={false}
            title="The Golden House"
          />
        ) : null}
        <Route exact path="/admin">
          {this.props.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginPage
              backgroundImage={require('./assets/banner-image-tgh-2.png')}
            />
          )}
        </Route>
        {this.state.pages.map(
          ({ url, title, tabName, backgroundImage, _id }) => {
            return this.createExactPage(url, {
              title,
              tabName,
              backgroundImage,
              _id,
            })
          },
        )}
        <EditSideBar type={editorType} content={editorData} />
        <PageModal
          title={
            this.props.inEditMode ? 'Leave Edit Mode?' : 'Enter Edit Mode?'
          }
          content={
            this.props.inEditMode
              ? 'Are you sure you want to leave edit mode?'
              : 'Are you sure you want to enter edit mode?'
          }
          showState={this.props.showEditModal}
          saveFunc={this.changeEditMode}
          closeFunc={this.closeEditModal}
        />
        <PageModal
          title={'Saved Successful!'}
          content={'Your updates have been pushed to the live site.'}
          showState={saveSuccess}
          saveFunc={() =>
            store.dispatch({ type: POST_CONSTANTS.CLOSE_SAVE_POST_SUCCESS })
          }
        />
        <PageModal
          title={'Saved Failed'}
          content={'Something went wrong while saving your updates.'}
          showState={saveFailed}
          saveFunc={() =>
            store.dispatch({ type: POST_CONSTANTS.CLOSE_SAVE_POST_FAILURE })
          }
        />
        <PageModal
          title={'Save Edits?'}
          content={
            'Are you sure you want to push your current page edits to the live site?'
          }
          showState={this.props.showSaveModal}
          saveFunc={this.saveContent}
          closeFunc={this.closeSaveModal}
        />
        {loggedIn ? (
          <Navbar
            className="edit-bar"
            edit={true}
            showProfile={false}
            standAlone={true}
            config={this.props.navConfig}
          />
        ) : null}
      </div>
    )
  }
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
  isEditing: state.edit.isEditing,
  showEditModal: state.edit.showEditModal,
  showSaveModal: state.post.showSaveModal,
  editorData: state.edit.editorData,
  editorType: state.edit.editorType,
  editorId: state.edit.editorId,
  loggedIn: state.auth.loggedIn,
  tab: state.post.tab,
  posts: state.post.posts,
  saveFailed: state.post.saveFailed,
})

export default connect(mapState)(App)
