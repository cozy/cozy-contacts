import { combineReducers } from 'redux'

import selection from '../components/Selection/selectionReducer'
import ui from '../helpers/modalManager'
const combinedReducers = combineReducers({ ui, selection })

export default combinedReducers
