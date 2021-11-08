import { combineReducers } from 'redux'
import authReducer from './authSlice'
import editReducer from './editSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  edit: editReducer,
})

export default rootReducer
