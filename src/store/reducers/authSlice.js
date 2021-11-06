const AUTH_CONSTANTS = require('../../constants/authConstants')

const initialState = [{ loggedIn: false }, { logginIn: false }]
console.log('initialState', initialState)
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CONSTANTS.LOGIN_REQUEST: {
      return [...state, { loggingIn: true }]
    }
    case AUTH_CONSTANTS.LOGIN_SUCCESS: {
      const { userId, response } = action
      return [...state, { userId, response, loggingIn: false }]
    }
    case AUTH_CONSTANTS.LOGIN_FAIL: {
      const { userId, error } = action
      return [...state, { userId, error, loggingIn: false }]
    }
  }
}
