/* eslint-disable */

import { React, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from './components/navbar'
import Page from './views/page'
import './stylesheets/index.scss'
import _generate from './functions/index'
import axios from 'axios'
import LoginPage from './views/loginPage'
import store from './store/store'
import { checkLoggedIn } from './store/reducers/authSlice'
import { connect } from 'react-redux'

const EDIT_CONSTANTS = require('./constants/editConstants')
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
    const SERVER_URL = _generate.serverFunctions.getServerURL()
    const loadedPages = await axios.get(`${SERVER_URL}/page`)
    this.setState({ pages: loadedPages.data })
  }

  updateEditMode = () => {
    store.dispatch({ type: EDIT_CONSTANTS.SHOW_EDIT_MODAL })
  }

  changeEditMode = () => {
    store.dispatch({ type: EDIT_CONSTANTS.CHANGE_EDIT_MODE })
    // this.setState((prevState) => ({
    //   showEditModal: false,
    //   isEdit: !prevState.isEdit,
    //   isEditMode: false,
    // }))
  }

  closeModal = () => {
    store.dispatch({ type: EDIT_CONSTANTS.CLOSE_EDIT_MODAL })
  }

  createExactPage = (
    path,
    { title, tabName, backgroundImage, tableName, navBar, dataSource, _id },
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
          tableName={tableName}
          navBar={navBar}
          dataSource={dataSource}
        />
      </Route>
    )
  }

  render() {
    return (
      <div className="app-container">
        <Route
          render={({ location }) =>
            ['/speedrun/leaderboard/fullpage'].includes(location.pathname) ? (
              <Navbar
                setEditMode={this.updateEditMode}
                title="Abyss Leaderboard"
                standAlone
              />
            ) : (
              <Navbar
                setEditMode={this.updateEditMode}
                title="The Golden House"
              />
            )
          }
        />
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
          ({
            url,
            title,
            tabName,
            backgroundImage,
            dataSource,
            tableName,
            _id,
          }) => {
            return this.createExactPage(url, {
              title,
              tabName,
              backgroundImage,
              tableName,
              dataSource,
              _id,
            })
          },
        )}
        {_generate.createFunctions.createModal(
          this.props.isEditing ? 'Leave Edit Mode?' : 'Enter Edit Mode?',
          this.props.isEditing
            ? 'Are you sure you want to leave edit mode?'
            : 'Are you sure you want to enter edit mode?',
          this.props.showEditModal,
          this.changeEditMode,
          this.closeModal,
        )}
      </div>
    )
  }
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
  isEditing: state.edit.isEditing,
  showEditModal: state.edit.showEditModal,
  loggedIn: state.auth.loggedIn,
})

export default connect(mapState)(App)
