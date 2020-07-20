/* global cozy */

import 'styles'

import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { render } from 'react-dom'
import { I18n, initTranslation } from 'cozy-ui/transpiled/react/I18n'
import App from 'components/App'
import configureStore from 'store/configureStore'
import { hot } from 'react-hot-loader'
import {
  DOCTYPE_CONTACTS,
  DOCTYPE_CONTACTS_VERSION,
  DOCTYPE_CONTACT_GROUPS,
  DOCTYPE_CONTACT_ACCOUNTS
} from '../../helpers/doctypes'
import manifest from '../../../manifest.webapp'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

const RootApp = props => (
  <CozyProvider client={props.client} store={props.store}>
    <I18n lang={props.lang} polyglot={props.polyglot}>
      <MuiCozyTheme>
        <HotedApp />
      </MuiCozyTheme>
    </I18n>
  </CozyProvider>
)

const HotedApp = hot(module)(App)
function getDataOrDefault(data, defaultData) {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  const root = document.querySelector('[role=application]')
  const { appName, appNamePrefix, iconPath, lang } = getValues(root.dataset)
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))

  const client = initCozyClient()
  const persistedState = {}
  const store = configureStore(
    client,
    polyglot.t.bind(polyglot),
    persistedState
  )
  /** I don't know why I need to for this... But if I don't it seems that
   * we have a race between configureStore and initCozyBar resulting in
   * an error from cozy-client "store is already defined"
   */
  setTimeout(() => {
    initCozyBar({ appName, appNamePrefix, client, iconPath, lang })
  }, 0)

  render(
    <RootApp client={client} lang={lang} store={store} polyglot={polyglot} />,
    root
  )
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
    appNamePrefixDefault: manifest.name_prefix,
    appNameDefault: manifest.name,
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
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema: {
      contacts: {
        doctype: DOCTYPE_CONTACTS,
        doctypeVersion: DOCTYPE_CONTACTS_VERSION,
        relationships: {
          groups: {
            type: 'has-many',
            doctype: DOCTYPE_CONTACT_GROUPS
          },
          accounts: {
            type: 'has-many',
            doctype: DOCTYPE_CONTACT_ACCOUNTS
          }
        }
      },
      groups: { doctype: DOCTYPE_CONTACT_GROUPS }
    }
  })
}

const getToken = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  return data.cozyToken
}

function initCozyBar({ appName, appNamePrefix, client, iconPath, lang }) {
  cozy.bar.init({
    appName,
    appNamePrefix,
    cozyClient: client,
    iconPath,
    lang,
    replaceTitleOnMobile: false
  })
}
