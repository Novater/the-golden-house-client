import React, { Component } from 'react'
import store from '../store/store'
import { authenticateUser } from '../store/reducers/authSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import _generate from '../functions/index'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'

const AUTH_CONSTANTS = require('../constants/authConstants')

class LoginPage extends Component {
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

  renderBackdrop = (image) => {
    if (!image) return null
    return (
      <LazyLoadImage
        src={image.default}
        className="banner-img"
        effect="opacity"
        alt="banner"
        style= {{ zIndex: -1 }}
      />
    )
  }

  render() {
    return (
      
      <div className="login-form">
        {
          this.props.loggingIn ? <div>Logging in...</div> :
          <>
            <h1 className="login-title">Login Dashboard</h1>
            <h4 className="login-message">How are you doing today?</h4>
            <p className="auth-message">{this.props.authMessage}</p>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              className='login-username'
              onChange={this.handleChangeUserName}
            ></input>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password..."
              name="password"
              className='login-password'
              onChange={this.handleChangePassword}
            ></input>
            <button onClick={this.loginUser.bind(this)}>Log In</button>
            {this.renderBackdrop(this.props.backgroundImage)}
          </>
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  loggingIn: state.auth.loggingIn,
  authMessage: state.auth.authMessage,
})

export default connect(mapState)(LoginPage)