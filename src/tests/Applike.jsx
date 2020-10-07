import React from 'react'
import { Provider } from 'react-redux'

import { CozyProvider } from 'cozy-client'
import I18n from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import langEn from '../locales/en.json'
import configureStore from '../store/configureStore'
import getCozyClient from './client'
import { SelectedGroupProvider } from '../components/Context'

const store = configureStore(getCozyClient(), null, {})

const AppLike = ({ children, client }) => (
  <BreakpointsProvider>
    <Provider store={store}>
      <CozyProvider client={client || getCozyClient()}>
        <I18n lang={'en'} dictRequire={() => langEn}>
          <SelectedGroupProvider>{children}</SelectedGroupProvider>
        </I18n>
      </CozyProvider>
    </Provider>
  </BreakpointsProvider>
)

AppLike.defaultProps = {
  store
}

export default AppLike
