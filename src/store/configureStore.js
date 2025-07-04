import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { barReducers } from 'cozy-bar'
import flag from 'cozy-flags'

import appReducers from '../reducers'

const configureStore = (client, t, persistedState) => {
  // Enable Redux dev tools
  const composeEnhancers =
    (flag('debug') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  // middlewares
  const middlewares = [thunkMiddleware.withExtraArgument({ client, t })]

  // logger middleware
  if (flag('debug')) {
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
