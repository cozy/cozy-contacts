import React from 'react'
import I18n from 'cozy-ui/transpiled/react/I18n'
import { CozyProvider } from 'cozy-client'
import { Provider } from 'react-redux'
import langEn from '../locales/en.json'
import configureStore from '../store/configureStore'
import getCozyClient from './client'

const store = configureStore(getCozyClient(), null, {})

const AppLike = ({ children, client }) => (
  <Provider store={store}>
    <CozyProvider client={client || getCozyClient()}>
      <I18n lang={'en'} dictRequire={() => langEn}>
        {children}
      </I18n>
    </CozyProvider>
  </Provider>
)

AppLike.defaultProps = {
  store
}

export default AppLike
