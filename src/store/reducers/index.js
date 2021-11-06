import { combineReducers } from 'redux'

import authReducer from './authSlice'

// {type: 'auth/login', payload: userPermissions }
// {type: 'auth/logout' }
// {type: 'editMode' }
//
const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
