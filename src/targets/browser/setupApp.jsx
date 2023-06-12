/* global __DEVELOPMENT__ */
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import memoize from 'lodash/memoize'

import { RealtimePlugin } from 'cozy-realtime'

import configureStore from 'store/configureStore'
import { initTranslation } from 'cozy-ui/transpiled/react/I18n'

import manifest from '../../../manifest.webapp'
import { getClient } from '../../helpers/client'
import { getValues, initBar } from '../../helpers/bar'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const { lang, appName } = getValues(JSON.parse(container.dataset.cozy))
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  client.registerPlugin(RealtimePlugin)

  const persistedState = {}

  const store = configureStore(
    client,
    polyglot.t.bind(polyglot),
    persistedState
  )
  client.setStore(store)

  Sentry.init({
    dsn: 'https://0db57f6ff6384bb3af8102f76bc01262@errors.cozycloud.cc/62',
    environment: __DEVELOPMENT__,
    release: manifest.version,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.35
  })

  initBar({ client, container, lang, appName })

  return { root, store, client, lang, polyglot }
})

export default setupApp
