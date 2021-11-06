import makeActionCreator from './makeActionCreator'
import axios from 'axios'
import _generate from '../../functions/index'
const AUTH_ACTIONS = require('../../constants/authConstants')


export function authenticateUser(dispatch, userId) {
  dispatch({
    type: AUTH_ACTIONS.AUTH_LOGIN_REQUEST,
    userId
  })

  const SERVER_URL = _generate.serverFunctions.getServerURL()
  try {
    const response = axios.get(`${SERVER_URL}/login`)
    dispatch({
      type: AUTH_ACTIONS.AUTH_LOGIN_SUCCESS,
      userId,
      response: response.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ACTIONS.AUTH_LOGIN_FAIL,
      userId,
      error
    })
  }
}