/* eslint-disable */

import { React, Component } from 'react'
import { Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Page from './views/page'
import './stylesheets/index.scss'
import _generate from './functions/index'
import BannerImg from './assets/banner-image-tgh-2.png'

require('dotenv').config()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      isEditMode: false,
      showEditModal: false,
      isLoggedIn: false,
    }
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
    return (
      <Route exact path={path}>
        <Page
          title={title}
          tabName={tabName}
          isEdit={this.state.isEdit}
          isEditMode={this.state.isEditMode}
          backgroundImage={backgroundImage}
          tableName={tableName}
          navBar={navBar}
          dataSource={dataSource}
        />
      </Route>
    )
  }

  loginUser = () => {
    this.setState({
      isLoggedIn: true,
    })
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
          <button
            style={{ position: 'absolute', left: '50%', top: '50%' }}
            onClick={this.loginUser}
            type="button"
          >
            Log In
          </button>
        </Route>
        {this.createExactPage('/', {
          title: 'Welcome to the Golden House',
          tabName: 'home',
          backgroundImage: BannerImg,
        })}
        {this.createExactPage('/about', {
          title: 'About Us',
          tabName: 'about',
          backgroundImage: BannerImg,
        })}
        {this.createExactPage('/speedrun/leaderboard', {
          tabName: 'speedrun-leaderboard',
          tableName: 'abyss',
          backgroundImage: BannerImg,
          dataSource: '/record/entries',
        })}
        ,
        {this.createExactPage('/speedrun/leaderboard/fullpage', {
          tableName: 'abyss',
          navBar: 'none',
          backgroundImage: '',
          dataSource: '/record/entries',
        })}
        {this.createExactPage('/contests', {
          title: 'Contests',
          tabName: 'contests',
          backgroundImage: BannerImg,
        })}
        {this.createExactPage('/partners', {
          title: 'Partners',
          tabName: 'partners',
          backgroundImage: BannerImg,
        })}
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
