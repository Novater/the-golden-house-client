import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import store from '../store/store'
import { connect } from 'react-redux'

function NavDropdownElement({ title, names, paths, inEditMode }) {
  const [navNames, setNames] = useState(names)
  const [navPaths, setPaths] = useState(paths)

  function addNewEl(event) {
    event.stopPropagation()
    setNames([...navNames, 'New element'])
    setPaths([...navPaths, '/'])
  }

  function setNavLinkName(idx) {
    return (event) => {
      const newName = event.target.value
      const copiedNames = [...navNames]
      copiedNames[idx] = newName
      setNames(copiedNames)
    }
  }

  function setNavLinkPath(idx) {
    return (event) => {
      const newPath = event.target.value
      const copiedPaths = [...navPaths]
      copiedPaths[idx] = newPath
      setPaths(copiedPaths)
    }
  }

  function removeNavEl(idx) {
    return (event) => {
      event.stopPropagation()
      const copiedNames = [...navNames]
      const copiedPaths = [...navPaths]
      copiedNames.splice(idx, 1)
      copiedPaths.splice(idx, 1)
      setNames(copiedNames)
      setPaths(copiedPaths)
    }
  }

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        {navNames.map((name, idx) => (
          <li>
            {inEditMode ? (
              <div className="dropdown-edit-row">
                <input
                  key={`nav-${title}-new`}
                  className="dropdown-item-name"
                  value={name}
                  onChange={setNavLinkName(idx)}
                ></input>
                <input
                  key={`nav-${title}-new`}
                  className="dropdown-item-path"
                  value={navPaths[idx]}
                  onChange={setNavLinkPath(idx)}
                ></input>
                <button
                  className="dropdown-item-remove"
                  title="remove"
                  onClick={removeNavEl(idx)}
                >
                  -
                </button>
              </div>
            ) : (
              <NavLink
                key={`nav-${idx}`}
                className="dropdown-item"
                to={navPaths[idx]}
              >
                {name}
              </NavLink>
            )}
          </li>
        ))}
        {inEditMode ? (
          <button
            key={`nav-${title}-new`}
            className="dropdown-add-button"
            onClick={addNewEl}
          >
            +
          </button>
        ) : null}
      </ul>
    </li>
  )
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
})

export default connect(mapState)(NavDropdownElement)
