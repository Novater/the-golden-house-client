import { React, Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import _generate from '../functions/index'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.isEdit !== this.props.isEdit) {
      // eslint-disable-next-line
      this.setState({
        isEdit: this.props.isEdit,
      })
    }
  }

  render() {
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
              </ul>
            </div>
          </div>
        )}
        {this.props.isLoggedIn ? (
          <div className="edit-icon">
            {this.state.isEdit ? (
              <FontAwesomeIcon
                title="Toggle Edit"
                icon={faEye}
                onClick={this.props.setEditMode}
              />
            ) : (
              <FontAwesomeIcon
                title="Toggle Edit"
                icon={faPenFancy}
                onClick={this.props.setEditMode}
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

Navbar.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  standAlone: PropTypes.bool,
  title: PropTypes.string,
  setEditMode: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
}
