import React from 'react'

import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'
import { WebviewIntentProvider } from 'cozy-intent'
import { Provider } from 'react-redux'
import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { SelectedGroupProvider } from 'components/Contexts/SelectedGroup'
import { SearchProvider } from 'components/Contexts/Search'

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
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
