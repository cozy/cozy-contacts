import '@babel/polyfill'

import 'styles'
import 'styles/intent'

import React from 'react'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import cozyClient, { CozyProvider } from 'cozy-client'
import { Intents } from 'cozy-interapp'

const renderApp = function(client, appLocale, appData) {
  const IntentHandler = require('components/Intents/IntentHandler').default
  const PickContacts = require('components/Intents/PickContacts').default
  const CreateContact = require('components/Intents/CreateContact').default
  const intents = new Intents({ client: client })
  render(
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
    </I18n>,
    document.querySelector('[role=application]')
  )
}

if (module.hot) {
  module.hot.accept('components/App', function() {
    renderApp()
  })
}

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function(toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const appLocale = getDataOrDefault(data.cozyLocale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  const client = new cozyClient({
    uri: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })

  renderApp(client, appLocale, data)
})
