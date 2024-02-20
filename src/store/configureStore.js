/* global __DEVELOPMENT__ */
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { barReducers } from 'cozy-bar'
import flag from 'cozy-flags'
import {
  shouldEnableTracking,
  getTracker,
  createTrackerMiddleware
} from 'cozy-ui/transpiled/react/helpers/tracker'

import appReducers from '../reducers'

const configureStore = (client, t, persistedState) => {
  // Enable Redux dev tools
  const composeEnhancers =
    (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  // middlewares
  const middlewares = [thunkMiddleware.withExtraArgument({ client, t })]

  // tracker middleware
  if (shouldEnableTracking() && getTracker()) {
    middlewares.push(createTrackerMiddleware())
  }

  // logger middleware
  if (flag('logs') && __DEVELOPMENT__) {
    // must be the last middleware in chain https://git.io/vHQpt
    const loggerMiddleware = createLogger()
    middlewares.push(loggerMiddleware)
  }

  const store = createStore(
    combineReducers({
      appReducers,
      ...barReducers,
      cozy: client.reducer(),
      persistedState
    }),
    composeEnhancers(applyMiddleware.apply(null, middlewares))
  )

  return store
}

export default configureStore
