import '@babel/polyfill'

import 'cozy-ui/transpiled/react/stylesheet.css'

import 'styles'
import 'styles/intent'
import React from 'react'
import { createRoot } from 'react-dom/client'

import cozyClient, { CozyProvider } from 'cozy-client'
import { Intents } from 'cozy-interapp'
import { RealtimePlugin } from 'cozy-realtime'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'

const renderApp = function (root, client, appLocale, appData) {
  const IntentHandler = require('components/Intents/IntentHandler').default
  const PickContacts = require('components/Intents/PickContacts').default
  const CreateContact = require('components/Intents/CreateContact').default
  const intents = new Intents({ client: client })
  root.render(
    <I18n
      lang={appLocale}
      dictRequire={appLocale => require(`locales/${appLocale}`)}
    >
      <CozyProvider client={client}>
        <IntentHandler appData={appData} intents={intents}>
          <PickContacts action="PICK" type="io.cozy.contacts" />
          <CreateContact action="CREATE" type="io.cozy.contacts" />
        </IntentHandler>
      </CozyProvider>
    </I18n>
  )
}

if (module.hot) {
  module.hot.accept('components/App', function () {
    renderApp()
  })
}

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function (toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const data = JSON.parse(container.dataset.cozy)

  const appLocale = getDataOrDefault(data.locale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  const client = new cozyClient({
    uri: `${protocol}//${data.domain}`,
    token: data.token,
    store: false
  })
  client.registerPlugin(RealtimePlugin)

  renderApp(root, client, appLocale, data)
})
