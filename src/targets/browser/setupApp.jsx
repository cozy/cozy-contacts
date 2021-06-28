import memoize from 'lodash/memoize'

import configureStore from 'store/configureStore'
import { initTranslation } from 'cozy-ui/transpiled/react/I18n'

import { getClient } from '../../helpers/client'
import { getValues, initBar } from '../../helpers/bar'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const root = document.querySelector('[role=application]')
  const { lang, appName } = getValues(JSON.parse(root.dataset.cozy))
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  const persistedState = {}

  const store = configureStore(
    client,
    polyglot.t.bind(polyglot),
    persistedState
  )
  client.setStore(store)

  initBar({ client, root, lang, appName })

  return { root, store, client, lang, polyglot }
})

export default setupApp
