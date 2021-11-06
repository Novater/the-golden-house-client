import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

export default store = createStore(rootReducer)

