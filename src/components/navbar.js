import { React, Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import _generate from '../functions/index'
import store from '../store/store'
import { connect } from 'react-redux'
import { logoutUser } from '../store/reducers/authSlice'

const EDIT_CONSTANTS = require('../constants/editConstants')
const AUTH_CONSTANTS = require('../constants/authConstants')

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  setEditMode() {
    store.dispatch({ type: EDIT_CONSTANTS.SHOW_EDIT_MODAL})
  }

  logOut() {
    store.dispatch({ type: AUTH_CONSTANTS.AUTH_LOGOUT_REQUEST })
    store.dispatch(logoutUser)
  }
  render() {
    const loggedIn = this.props.loggedIn

    return (
      <nav className="navbar navbar-expand-lg bg-dark main-nav">
        {this.props.standAlone ? (
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/" target="_blank">
              {this.props.title}
            </NavLink>
          </div>
        ) : (
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              {this.props.title}
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                {_generate.navbarFunctions.createNavSimpleElement(
                  'About',
                  '/about',
                )}
                {_generate.navbarFunctions.createNavDropdownElement(
                  'Speedrunning',
                  {
                    names: ['Leaderboards'],
                    paths: ['/speedrun/leaderboard'],
                  },
                )}
                {_generate.navbarFunctions.createNavDropdownElement('DPS', {
                  names: ['Abyss', 'Events', 'Open World', 'Primo Geovishap'],
                  paths: [
                    '/dps/abyss',
                    '/dps/events',
                    '/dps/openworld',
                    '/dps/primo-geovishap',
                  ],
                })}
                {_generate.navbarFunctions.createNavSimpleElement(
                  'Contests',
                  '/contests',
                )}
                {_generate.navbarFunctions.createNavSimpleElement(
                  'Partners',
                  '/partners',
                )}
                {_generate.navbarFunctions.createNavSimpleElement(
                  'Contact Us',
                  '/contact-us',
                )}
                {
                  this.props.loggedIn ?
                  <li className="nav-item dropdown user-display">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {this.props.id}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <div key='nav-logout' className="dropdown-item" onClick={this.logOut}>
                          Logout
                        </div>
                      </li>
                    </ul>
                  </li>: null
                }
              </ul>
            </div>
          </div>
        )}
        {loggedIn ? (
          <div className="edit-icon">
            {this.props.inEditMode ? (
              <FontAwesomeIcon
                title="Toggle Edit"
                icon={faEye}
                onClick={this.setEditMode}
              />
            ) : (
              <FontAwesomeIcon
                title="Toggle Edit"
                icon={faPenFancy}
                onClick={this.setEditMode}
              />
            )}
          </div>
        ) : (
          ''
        )}
      </nav>
    )
  }
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
  isEditing: state.edit.isEditing,
  showEditModal: state.edit.showEditModal,
  loggedIn: state.auth.loggedIn,
  id: state.auth.id
})

Navbar.propTypes = {
  standAlone: PropTypes.bool,
  title: PropTypes.string,
  setEditMode: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapState)(Navbar)
