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
import setupApp from './setupApp'
import { SelectedGroupProvider } from '../../components/Contexts/SelectedGroup'
import { SearchProvider } from '../../components/Contexts/Search'
import { SelectedFirstLetterProvider } from '../../components/Contexts/SelectedFirstLetter'

const init = () => {
  const { root, store, client, lang, polyglot } = setupApp()

  render(
    <Provider store={store}>
      <CozyProvider client={client}>
        <I18n lang={lang} polyglot={polyglot}>
          <MuiCozyTheme>
            <BreakpointsProvider>
              <SelectedGroupProvider>
                <SearchProvider>
                  <SelectedFirstLetterProvider>
                    <App />
                  </SelectedFirstLetterProvider>
                </SearchProvider>
              </SelectedGroupProvider>
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
