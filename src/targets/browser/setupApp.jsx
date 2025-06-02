import { CaptureConsole } from '@sentry/integrations'
import * as Sentry from '@sentry/react'
import memoize from 'lodash/memoize'
import { createRoot } from 'react-dom/client'
import configureStore from 'store/configureStore'

import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import manifest from '../../../manifest.webapp'
import { getValues } from '../../helpers/bar'
import { getClient } from '../../helpers/client'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const data = JSON.parse(container.dataset.cozy)
  const { lang } = getValues(data)
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  client.registerPlugin(RealtimePlugin)
  client.registerPlugin(flag.plugin)

  const persistedState = {}

  const store = configureStore(
    client,
    polyglot.t.bind(polyglot),
    persistedState
  )
  client.setStore(store)

  Sentry.init({
    dsn: 'https://0db57f6ff6384bb3af8102f76bc01262@errors.cozycloud.cc/62',
    environment: process.env.NODE_ENV,
    release: manifest.version,
    integrations: [
      new CaptureConsole({ levels: ['error'] }), // We also want to capture the `console.error` to, among other things, report the logs present in the `try/catch`
      new Sentry.BrowserTracing()
    ],
    tracesSampleRate: 1,
    // React log these warnings(bad Proptypes), in a console.error, it is not relevant to report this type of information to Sentry
    ignoreErrors: [/^Warning: /]
  })

  return { root, store, client, lang, polyglot, appData: data }
})

export default setupApp
