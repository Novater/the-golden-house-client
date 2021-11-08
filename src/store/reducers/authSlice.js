const AUTH_CONSTANTS = require('../../constants/authConstants')
import _generate from '../../functions/index'
import axios from 'axios'

axios.defaults.withCredentials = true

const initialState = { loggedIn: false, loggingIn: false, role: null, id: null, authMessage: '' }

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CONSTANTS.AUTH_LOGIN_REQUEST: {
      const { username, password } = action.payload
      return { ...state, loggingIn: true, username, password, authMessage: '' }
    }
    case AUTH_CONSTANTS.AUTH_LOGOUT: {
      return { ...state, loggedIn: false }
    }
    case AUTH_CONSTANTS.AUTH_LOGIN_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        role: data.role,
        id: data.id,
      }
    }
    case AUTH_CONSTANTS.AUTH_LOGIN_FAIL: {
      const { error } = action.payload
      console.log('error', error)
      return { ...state, loggingIn: false, role: null, authMessage: 'You have entered an incorrect username and password combination.' }
    }
    case AUTH_CONSTANTS.AUTH_CHECK_LOGGED_IN: {
      const { data } = action.payload
      if (!data.id || !data.role)
        return { ...state, loggedIn: false, role: null }
      return { ...state, loggedIn: true, role: data.role, id: data.id }
    }
    default:
      return { ...state }
  }
}

export async function logoutUser(dispatch, getState) {
  const SERVER_URL = _generate.serverFunctions.getServerURL()
  await axios.post(`${SERVER_URL}/logout`)
  dispatch({
    type: AUTH_CONSTANTS.AUTH_LOGOUT,
  })
}

export async function checkLoggedIn(dispatch, getState) {
  const SERVER_URL = _generate.serverFunctions.getServerURL()

  try {
    const response = await axios.get(`${SERVER_URL}/logged-in`)
    dispatch({
      type: AUTH_CONSTANTS.AUTH_CHECK_LOGGED_IN,
      payload: {
        data: response.data,
      },
    })
  } catch (error) {
    dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_FAIL,
      payload: {
        error: error,
      },
    })
  }
}

export async function authenticateUser(dispatch, getState) {
  const SERVER_URL = _generate.serverFunctions.getServerURL()
  try {
    const username = getState().auth.username
    const password = getState().auth.password

    const response = await axios.post(`${SERVER_URL}/login`, {
      username,
      password,
    })
    dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_SUCCESS,
      payload: {
        data: response.data,
      },
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_FAIL,
      payload: {
        error: error,
      },
    })
  }
}
