import { combineReducers } from 'redux'

//export const reducers = {}
import ui from '../helpers/modalManager'
const combinedReducers = combineReducers({ ui })

export default combinedReducers
