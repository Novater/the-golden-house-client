import { NavLink } from 'react-router-dom'
import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'

function NavSimpleElement({ title, path }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={path}>
        {title}
      </NavLink>
    </li>
  )
}

const mapState = (state) => ({
  inEditMode: state.edit.inEditMode,
})

export default connect(mapState)(NavSimpleElement)
