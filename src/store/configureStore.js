/* global __DEVELOPMENT__ */
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import flag from 'cozy-flags'
import {
  shouldEnableTracking,
  getTracker,
  createTrackerMiddleware
} from 'cozy-ui/transpiled/react/helpers/tracker'
//import { isReporterEnabled, getReporterMiddleware } from 'lib/sentry'

import appReducers from '../reducers'

const configureStore = (client, t, persistedState) => {
  // Enable Redux dev tools
  const composeEnhancers =
    (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const cozyReducer = client.reducer()
  // reducers
  //const reducers = [appReducers, persistedState, cozyReducer]
  const reducers = combineReducers({
    appReducers,
    persistedState,
    cozy: cozyReducer
  })
  // middlewares
  const middlewares = [thunkMiddleware.withExtraArgument({ client, t })]

  if (shouldEnableTracking() && getTracker()) {
    middlewares.push(createTrackerMiddleware())
  }
  if (flag('logs') && __DEVELOPMENT__) {
    // eslint-disable-line
    // must be the last middleware in chain https://git.io/vHQpt
    const loggerMiddleware = createLogger()
    middlewares.push(loggerMiddleware)
  }
  /* if (isReporterEnabled()) {
    middlewares.push(getReporterMiddleware(cozyClient))
  } */

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware.apply(null, middlewares))
  )

  return store
}

export default configureStore
