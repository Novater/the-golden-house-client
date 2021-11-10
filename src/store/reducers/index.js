import { combineReducers } from 'redux'
import authReducer from './authSlice'
import editReducer from './editSlice'
import postReducer from './postSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  edit: editReducer,
  post: postReducer,
})

export default rootReducer
