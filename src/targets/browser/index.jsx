/* global cozy */

import 'styles'

import React from 'react'
import CozyClient, { CozyProvider, StackLink } from 'cozy-client'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import App from 'components/App'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

const RootApp = props => (
  <Provider store={props.store}>
    <I18n lang={props.lang} dictRequire={lang => require(`locales/${lang}`)}>
      <CozyProvider client={props.client}>
        <App />
      </CozyProvider>
    </I18n>
  </Provider>
)

function getDataOrDefault(data, defaultData) {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  console.log('init')
  const root = document.querySelector('[role=application]')
  const { appName, appNamePrefix, iconPath, lang } = getValues(root.dataset)
  console.log('data')
  const client = initCozyClient(/* root.dataset.cozyDomain, root.dataset.cozyToken */)
  console.log('client', client)
  initCozyBar({ appName, appNamePrefix, iconPath, lang })
  const persistedState = {}
  const store = configureStore(client, persistedState)
  console.log({ store })

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
  //const { protocol = 'https' } = window.location
  /* return new CozyClient({
    uri: `${protocol}//${cozyDomain}`,
    token: cozyToken
  }) */

  return new CozyClient({
    uri: getCozyURI(),
    token: getToken(),
    scope: ['io.cozy.contacts'],
    links: new StackLink()
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
