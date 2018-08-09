/* global cozy */

import 'styles'

import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import App from 'components/App'

const RootApp = props => (
  <I18n lang={props.lang} dictRequire={lang => require(`locales/${lang}`)}>
    <CozyProvider client={props.client}>
      <App />
    </CozyProvider>
  </I18n>
)

function getDataOrDefault(data, defaultData) {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  const root = document.querySelector('[role=application]')
  const { appName, appNamePrefix, iconPath, lang } = getValues(root.dataset)
  const client = initCozyClient(root.dataset.cozyDomain, root.dataset.cozyToken)
  initCozyBar({ appName, appNamePrefix, iconPath, lang })

  if (module.hot) {
    module.hot.accept('components/App', () => {
      return requestAnimationFrame(() => {
        render(<RootApp client={client} lang={lang} />, root)
      })
    })
  }
  render(<RootApp client={client} lang={lang} />, root)
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

function initCozyClient(cozyDomain, cozyToken) {
  const { protocol = 'https' } = window.location
  return new CozyClient({
    uri: `${protocol}//${cozyDomain}`,
    token: cozyToken
  })
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
