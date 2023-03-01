import { createRoot } from 'react-dom/client'
import memoize from 'lodash/memoize'

import { RealtimePlugin } from 'cozy-realtime'

import configureStore from 'store/configureStore'
import { initTranslation } from 'cozy-ui/transpiled/react/I18n'

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

  initBar({ client, container, lang, appName })

  return { root, store, client, lang, polyglot }
})

export default setupApp
