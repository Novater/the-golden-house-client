/* eslint-disable */

import { NavLink } from 'react-router-dom'
import React from 'react'

export default class navbarFunctions {
  static createNavSimpleElement(title, path) {
    return (
      <li className="nav-item">
        <NavLink className="nav-link" to={path}>
          {title}
        </NavLink>
      </li>
    )
  }

  static createNavDropdownElement(title, { names, paths }) {
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
          {names.map((name, idx) => (
            <li>
              <NavLink key={`nav-${idx}`} className="dropdown-item" to={paths[idx]}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}
