import React from 'react'

import { WebviewIntentProvider } from 'cozy-intent'
import { Provider } from 'react-redux'
import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { SelectedGroupProvider } from 'components/Contexts/SelectedGroup'
import { SearchProvider } from 'components/Contexts/Search'

const AppProviders = ({ store, client, lang, polyglot, children }) => {
  return (
    <WebviewIntentProvider>
      <Provider store={store}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <MuiCozyTheme>
              <BreakpointsProvider>
                <SelectedGroupProvider>
                  <SearchProvider>{children}</SearchProvider>
                </SelectedGroupProvider>
              </BreakpointsProvider>
            </MuiCozyTheme>
          </I18n>
        </CozyProvider>
      </Provider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
