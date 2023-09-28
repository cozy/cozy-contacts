/* global __DEVELOPMENT__ */
import * as Sentry from '@sentry/react'
import memoize from 'lodash/memoize'
import { createRoot } from 'react-dom/client'
import configureStore from 'store/configureStore'

import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import manifest from '../../../manifest.webapp'
import { getValues, initBar } from '../../helpers/bar'
import { getClient } from '../../helpers/client'

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
  client.registerPlugin(flag.plugin)

  if (process.env.NODE_ENV !== 'production' && flag('switcher') === null) {
    flag('switcher', true)
  }

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
