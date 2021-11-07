import React, { Component } from 'react'
import store from '../store/store'
import { authenticateUser } from '../store/reducers/authSlice'
import bcrypt from 'bcryptjs'

const AUTH_CONSTANTS = require('../constants/authConstants')

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  async loginUser() {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(this.state.password, salt)

    store.dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_REQUEST,
      payload: {
        username: this.state.username,
        password: hashedPassword,
      },
    })

    store.dispatch(authenticateUser)
  }

  handleChangeUserName = (event) => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username..."
          name="username"
          onChange={this.handleChangeUserName}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password..."
          name="password"
          onChange={this.handleChangePassword}
        ></input>
        <button onClick={this.loginUser.bind(this)}>Log In</button>
      </div>
    )
  }
}
