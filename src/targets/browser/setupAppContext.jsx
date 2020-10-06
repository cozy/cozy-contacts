import memoize from 'lodash/memoize'

import { initTranslation } from 'cozy-ui/transpiled/react/I18n'
import configureStore from 'store/configureStore'
import { getClient } from '../../helpers/client'
import { getValues, initBar } from '../../helpers/bar'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const root = document.querySelector('[role=application]')

  const { lang } = getValues(root.dataset)
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  const persistedState = {}

  const store = configureStore(
    client,
    polyglot.t.bind(polyglot),
    persistedState
  )
  client.setStore(store)

  initBar(client)

  return { root, store, client, lang, polyglot }
})

export default setupApp
