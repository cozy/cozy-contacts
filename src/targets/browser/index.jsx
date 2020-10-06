import 'cozy-ui/transpiled/react/stylesheet.css'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import memoize from 'lodash/memoize'

import { CozyProvider } from 'cozy-client'
import { I18n, initTranslation } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import App from 'components/App'
import configureStore from 'store/configureStore'
import { getClient } from '../../helpers/client'
import { getValues, initBar } from '../../helpers/bar'
import '../../styles/index.styl'

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

  /** I don't know why I need to for this... But if I don't it seems that
   * we have a race between configureStore and initBar resulting in
   * an error from cozy-client "store is already defined"
   */
  setTimeout(() => {
    initBar(client)
  }, 0)

  return { root, store, client, lang, polyglot }
})

const init = () => {
  const { root, store, client, lang, polyglot } = setupApp()

  render(
    <Provider store={store}>
      <CozyProvider client={client} store={store}>
        <I18n lang={lang} polyglot={polyglot}>
          <MuiCozyTheme>
            <BreakpointsProvider>
              <App />
            </BreakpointsProvider>
          </MuiCozyTheme>
        </I18n>
      </CozyProvider>
    </Provider>,
    root
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
