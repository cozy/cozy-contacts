import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { CozyProvider } from 'cozy-client'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'

import getCozyClient from './client'
import { ContactsDiplayedProvider } from '../components/Contexts/ContactsDiplayed'
import { SearchProvider } from '../components/Contexts/Search'
import { SelectedGroupProvider } from '../components/Contexts/SelectedGroup'
import langEn from '../locales/en.json'
import configureStore from '../store/configureStore'

const store = configureStore(getCozyClient(), null, {})

const AppLike = ({ children, client }) => (
  <BreakpointsProvider>
    <Provider store={store}>
      <CozyProvider client={client || getCozyClient()}>
        <I18n lang="en" dictRequire={() => langEn}>
          <ContactsDiplayedProvider>
            <SelectedGroupProvider>
              <SearchProvider>
                <HashRouter>{children}</HashRouter>
              </SearchProvider>
            </SelectedGroupProvider>
          </ContactsDiplayedProvider>
        </I18n>
      </CozyProvider>
    </Provider>
  </BreakpointsProvider>
)

AppLike.defaultProps = {
  store
}

export default AppLike
