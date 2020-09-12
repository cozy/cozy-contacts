import { combineReducers } from 'redux'

//export const reducers = {}
import ui from '../helpers/modalManager'
import filter from '../components/Filter/filterReducer'
import selection from '../components/Selection/selectionReducer'
const combinedReducers = combineReducers({ ui, filter, selection })

export default combinedReducers
