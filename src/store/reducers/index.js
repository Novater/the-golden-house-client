import { combineReducers } from 'redux'

import monitorReducerEnhancer from './monitorReducerEnhancer'

export default combinerReducers({
  monitor: monitorReducerEnhancer,
})
