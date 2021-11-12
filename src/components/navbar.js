import { React, Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenFancy, faSave } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import _generate from '../functions/index'
import store from '../store/store'
import { connect } from 'react-redux'
import { logoutUser } from '../store/reducers/authSlice'
import NavSimpleElement from './navsimpleelement'
import NavDropdownElement from './navdropdownelement'
const EDIT_CONSTANTS = require('../constants/editConstants')
const AUTH_CONSTANTS = require('../constants/authConstants')
const POST_CONSTANTS = require('../constants/postConstants')

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  setEditMode() {
    store.dispatch({ type: EDIT_CONSTANTS.SHOW_EDIT_MODAL })
  }

  handleClickSave = () => {
    store.dispatch({ type: POST_CONSTANTS.SHOW_SAVE_MODAL })
  }

  logOut() {
    store.dispatch({ type: AUTH_CONSTANTS.AUTH_LOGOUT_REQUEST })
    store.dispatch(logoutUser)
  }
  render() {
    const { loggedIn, inEditMode, id, className, edit, showProfile } =
      this.props

    return (
      <nav className={`navbar navbar-expand-lg bg-dark ${className}`}>
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
                <NavSimpleElement title="About" path="/about" />
                <NavDropdownElement
                  title="Speedrunning"
                  names={['Leaderboards']}
                  paths={['/speedrun/leaderboard']}
                />
                <NavDropdownElement
                  title="DPS"
                  names={['Abyss', 'Events', 'Open World', 'Primo Geovishap']}
                  paths={[
                    '/dps/abyss',
                    '/dps/events',
                    '/dps/openworld',
                    '/dps/primo-geovishap',
                  ]}
                />
                <NavSimpleElement title="Contests" path="/contests" />
                <NavSimpleElement title="Partners" path="/partners" />
                <NavSimpleElement title="Contact Us" path="/contact-us" />
                {loggedIn && showProfile ? (
                  <li className="nav-item dropdown user-display">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome {id}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <div
                          key="nav-logout"
                          className="dropdown-item"
                          onClick={this.logOut}
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        )}
        {loggedIn && edit ? (
          <div className="edit-icon">
            {inEditMode ? (
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
        {loggedIn && inEditMode && edit ? (
          <div className="save-icon">
            {this.props.inEditMode ? (
              <FontAwesomeIcon
                title="Save Edit"
                icon={faSave}
                onClick={this.handleClickSave}
              />
            ) : null}
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
  id: state.auth.id,
})

Navbar.propTypes = {
  standAlone: PropTypes.bool,
  title: PropTypes.string,
  setEditMode: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapState)(Navbar)
