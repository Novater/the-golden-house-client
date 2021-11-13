import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)
export default store
