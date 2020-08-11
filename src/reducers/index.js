import { combineReducers } from 'redux'

//export const reducers = {}
import ui from '../helpers/modalManager'
import selection from '../components/Selection/selectionReducer'
import filter from '../components/AlphabetFilter/alphabetFilterReducer'
const combinedReducers = combineReducers({ ui, selection, filter })

export default combinedReducers
