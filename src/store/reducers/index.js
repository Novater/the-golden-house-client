import { combineReducers } from 'redux'
import authReducer from './authSlice'
import editReducer from './editSlice'
import postReducer from './postSlice'
import navReducer from './navSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  edit: editReducer,
  post: postReducer,
  nav: navReducer,
})

export default rootReducer
