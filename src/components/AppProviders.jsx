import React from 'react'
import { Provider } from 'react-redux'

import { CozyProvider } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { ContactsDiplayedProvider } from './Contexts/ContactsDiplayed'
import { SearchProvider } from './Contexts/Search'
import { SelectedGroupProvider } from './Contexts/SelectedGroup'

const AppProviders = ({ store, client, lang, polyglot, children }) => {
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

  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <Provider store={store}>
          <CozyProvider client={client}>
            <I18n lang={lang} polyglot={polyglot}>
              <CozyTheme>
                <BreakpointsProvider>
                  <ContactsDiplayedProvider>
                    <SelectedGroupProvider>
                      <SearchProvider>{children}</SearchProvider>
                    </SelectedGroupProvider>
                  </ContactsDiplayedProvider>
                </BreakpointsProvider>
              </CozyTheme>
            </I18n>
          </CozyProvider>
        </Provider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
