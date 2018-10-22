/* global cozy */

import 'styles'

import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import App from 'components/App'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { hot } from 'react-hot-loader'

const RootApp = props => (
  <Provider store={props.store}>
    <I18n lang={props.lang} dictRequire={lang => require(`locales/${lang}`)}>
      <CozyProvider client={props.client}>
        <HotedApp />
      </CozyProvider>
    </I18n>
  </Provider>
)

const HotedApp = hot(module)(App)
function getDataOrDefault(data, defaultData) {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  const root = document.querySelector('[role=application]')
  const { appName, appNamePrefix, iconPath, lang } = getValues(root.dataset)
  const client = initCozyClient()
  initCozyBar({ appName, appNamePrefix, iconPath, lang })
  const persistedState = {}
  const store = configureStore(client, persistedState)

  render(<RootApp client={client} lang={lang} store={store} />, root)
}

/**
 * default data will allow to display correctly the cozy-bar
 * in the standalone (without cozy-stack connexion)
 */
function getValues({
  cozyAppName,
  cozyAppNamePrefix,
  cozyIconPath,
  cozyLocale
}) {
  const defaultValues = {
    appIconDefault: require('../vendor/assets/icon.svg'),
    appNamePrefixDefault: require('../../../manifest.webapp').name_prefix,
    appNameDefault: require('../../../manifest.webapp').name,
    appLocaleDefault: 'en'
  }
  return {
    appName: getDataOrDefault(cozyAppName, defaultValues.appNameDefault),
    appNamePrefix: getDataOrDefault(
      cozyAppNamePrefix,
      defaultValues.appNamePrefixDefault
    ),
    iconPath: getDataOrDefault(cozyIconPath, defaultValues.appIconDefault),
    lang: getDataOrDefault(cozyLocale, defaultValues.appLocaleDefault)
  }
}
const getCozyURI = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol

  return `${protocol}//${data.cozyDomain}`
}
function initCozyClient(/* cozyDomain, cozyToken */) {
  return new CozyClient({
    uri: getCozyURI(),
    token: getToken(),
    schema: {
      contacts: { doctype: 'io.cozy.contacts' },
      groups: { doctype: 'io.cozy.contacts.groups' }
    }
  })
}

const getToken = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  return data.cozyToken
}

function initCozyBar({ appName, appNamePrefix, iconPath, lang }) {
  cozy.bar.init({
    appName,
    appNamePrefix,
    iconPath,
    lang,
    replaceTitleOnMobile: true
  })
}
