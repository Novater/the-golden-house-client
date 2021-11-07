/* eslint-disable */

import { React, Component } from 'react'
import { Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Page from './views/page'
import './stylesheets/index.scss'
import _generate from './functions/index'
import axios from 'axios'
import LoginPage from './views/loginPage'

require('dotenv').config()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      isEditMode: false,
      tableEditable: false,
      showEditModal: false,
      isLoggedIn: false,
      pages: [],
    }
  }

  async componentDidMount() {
    const SERVER_URL = _generate.serverFunctions.getServerURL()
    const loadedPages = await axios.get(`${SERVER_URL}/page`)
    this.setState({ pages: loadedPages.data })
  }

  updateEditMode = () => {
    this.setState({ showEditModal: true })
  }

  changeEditMode = () => {
    this.setState((prevState) => ({
      showEditModal: false,
      isEdit: !prevState.isEdit,
      isEditMode: false,
    }))
  }

  closeModal = () => {
    this.setState({ showEditModal: false })
  }

  createExactPage = (
    path,
    { title, tabName, backgroundImage, tableName, navBar, dataSource },
  ) => {
    let backgroundURL
    try {
      backgroundURL = require(`${backgroundImage}`)
    } catch (e) {
      backgroundURL = null
    }

    return (
      <Route exact path={path}>
        <Page
          title={title}
          tabName={tabName}
          isEdit={this.state.isEdit}
          isEditMode={this.state.isEditMode}
          tableEditable={this.state.tableEditable}
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
                isEdit={this.state.isEdit}
                title="Abyss Leaderboard"
                isLoggedIn={this.state.isLoggedIn}
                standAlone
              />
            ) : (
              <Navbar
                setEditMode={this.updateEditMode}
                isEdit={this.state.isEdit}
                title="The Golden House"
                isLoggedIn={this.state.isLoggedIn}
              />
            )
          }
        />
        <Route exact path="/secret-login/12345">
          <LoginPage />
        </Route>
        {this.state.pages.map(
          ({ url, title, tabName, backgroundImage, dataSource, tableName }) => {
            return this.createExactPage(url, {
              title,
              tabName,
              backgroundImage,
              tableName,
              dataSource,
            })
          },
        )}
        {_generate.createFunctions.createModal(
          this.state.isEdit ? 'Leave Edit Mode?' : 'Enter Edit Mode?',
          this.state.isEdit
            ? 'Are you sure you want to leave edit mode?'
            : 'Are you sure you want to enter edit mode?',
          this.state.showEditModal,
          this.changeEditMode,
          this.closeModal,
        )}
      </div>
    )
  }
}
