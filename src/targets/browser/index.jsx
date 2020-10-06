import 'cozy-ui/transpiled/react/stylesheet.css'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import App from 'components/App'
import '../../styles/index.styl'
import setupAppContext from './setupAppContext'

const init = () => {
  const { root, store, client, lang, polyglot } = setupAppContext()

  render(
    <Provider store={store}>
      <CozyProvider client={client}>
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
