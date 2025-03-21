import React from 'react'
import { Provider } from 'react-redux'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { DataProxyProvider } from 'cozy-dataproxy-lib'
import { WebviewIntentProvider } from 'cozy-intent'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { ContactsDiplayedProvider } from './Contexts/ContactsDiplayed'
import { SearchProvider } from './Contexts/Search'
import { SelectedGroupProvider } from './Contexts/SelectedGroup'

const dataProxyProviderOptions = {
  doctypes: ['io.cozy.contacts', 'io.cozy.files', 'io.cozy.apps']
}

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
            <DataProxyProvider options={dataProxyProviderOptions}>
              <I18n lang={lang} polyglot={polyglot}>
                <CozyTheme>
                  <BreakpointsProvider>
                    <AlertProvider>
                      <BarProvider>
                        <ContactsDiplayedProvider>
                          <SelectedGroupProvider>
                            <SearchProvider>{children}</SearchProvider>
                          </SelectedGroupProvider>
                        </ContactsDiplayedProvider>
                      </BarProvider>
                    </AlertProvider>
                  </BreakpointsProvider>
                </CozyTheme>
              </I18n>
            </DataProxyProvider>
          </CozyProvider>
        </Provider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
