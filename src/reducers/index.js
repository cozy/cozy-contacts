import { combineReducers } from 'redux'

import ui from '../helpers/modalManager'
import selection from '../components/Selection/selectionReducer'
const combinedReducers = combineReducers({ ui, selection })

export default combinedReducers
