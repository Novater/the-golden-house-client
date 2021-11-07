const AUTH_CONSTANTS = require('../../constants/authConstants')
import _generate from '../../functions/index'
import axios from 'axios'
import { data } from 'jquery'
const initialState = { loggedIn: false, loggingIn: false }

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CONSTANTS.AUTH_LOGIN_REQUEST: {
      console.log('Logging in user.', action.payload.username)
      const { username, password } = action.payload
      return { ...state, loggingIn: true, username, password }
    }
    case AUTH_CONSTANTS.AUTH_LOGIN_SUCCESS: {
      const { data } = action.payload
      return { ...state, loggingIn: false, permissions: data.permissions }
    }
    case AUTH_CONSTANTS.AUTH_LOGIN_FAIL: {
      const { error } = action.payload
      console.log('error', error)
      return { ...state, error, loggingIn: false }
    }
    default:
      return { ...state }
  }
}

export async function authenticateUser(dispatch, getState) {

  const SERVER_URL = _generate.serverFunctions.getServerURL()
  try {
    const response = await axios.get(`${SERVER_URL}/login/:username/:password`)
    console.log(response)
    dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_SUCCESS,
      payload: {
        data: response.data,
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: AUTH_CONSTANTS.AUTH_LOGIN_FAIL,
      payload: {
        error: error
      }
    })
  }
}
