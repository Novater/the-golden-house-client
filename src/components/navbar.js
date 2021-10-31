import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      isEdit: false
    };
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isEdit !== this.props.isEdit) {
      this.setState({
        isEdit: this.props.isEdit
      });
    }
  }

  render = () => {
    return (
      <nav className="navbar navbar-expand-lg bg-dark main-nav">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            The Golden House
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
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Speedrunning
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><NavLink className="dropdown-item" to="/leaderboard">Leaderboards</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  DPS
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><NavLink className="dropdown-item" to="/dps/abyss">Abyss</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/dps/events">Events</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/dps/openworld">Open World</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/dps/primo-geovishap">Primo Geovishap</NavLink></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contests">
                  Contests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/partners">
                  Partners
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className='edit-icon'>
          { this.state.isEdit ?
            <FontAwesomeIcon title='Toggle Edit' icon={faEye} onClick={this.props.setEditMode} /> : <FontAwesomeIcon title='Toggle Edit' icon={faPenFancy} onClick={this.props.setEditMode} />
          }
        </div>
      </nav> 
    );
  }
};