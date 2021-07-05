import 'cozy-ui/transpiled/react/stylesheet.css'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import App from 'components/App'
import '../../styles/index.styl'
import setupApp from './setupApp'
import { SelectedGroupProvider } from '../../components/Contexts/SelectedGroup'
import { SearchProvider } from '../../components/Contexts/Search'
import { SearchByLetterProvider } from '../../components/Contexts/SearchByLetter'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const init = () => {
  const { root, store, client, lang, polyglot } = setupApp()

  render(
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <MuiCozyTheme>
              <BreakpointsProvider>
                <SelectedGroupProvider>
                  <SearchProvider>
                    <SearchByLetterProvider>
                      <App />
                    </SearchByLetterProvider>
                  </SearchProvider>
                </SelectedGroupProvider>
              </BreakpointsProvider>
            </MuiCozyTheme>
          </I18n>
        </CozyProvider>
      </StylesProvider>
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
