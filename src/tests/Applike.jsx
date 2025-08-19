import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { CozyProvider } from 'cozy-client'
import { Layout } from 'cozy-ui/transpiled/react/Layout'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'

import getCozyClient from './client'
import { ContactsDiplayedProvider } from '../components/Contexts/ContactsDiplayed'
import SearchProvider from '../components/Contexts/Search'
import { SelectedGroupProvider } from '../components/Contexts/SelectedGroup'
import langEn from '../locales/en.json'
import configureStore from '../store/configureStore'

const store = configureStore(getCozyClient(), null, {})

const AppLike = ({ children, client }) => (
  <BreakpointsProvider>
    <Provider store={store}>
      <CozyProvider client={client || getCozyClient()}>
        <I18n lang="en" dictRequire={() => langEn}>
          <CozyTheme>
            <AlertProvider>
              <ContactsDiplayedProvider>
                <SelectedGroupProvider>
                  <SearchProvider>
                    <HashRouter>
                      <Layout>{children}</Layout>
                    </HashRouter>
                  </SearchProvider>
                </SelectedGroupProvider>
              </ContactsDiplayedProvider>
            </AlertProvider>
          </CozyTheme>
        </I18n>
      </CozyProvider>
    </Provider>
  </BreakpointsProvider>
)

AppLike.defaultProps = {
  store
}

export default AppLike
