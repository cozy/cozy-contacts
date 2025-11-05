/* eslint-disable import/order */
import '@babel/polyfill'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui-plus/dist/stylesheet.css'
import '../../styles/index.styl'
import '../../styles/intent.styl'

import React from 'react'

import { Intents } from 'cozy-interapp'
import AppProviders from '@/components/AppProviders'
import setupApp from '../browser/setupApp'

import IntentHandler from '@/components/Intents/IntentHandler'
import PickContacts from '@/components/Intents/PickContacts'
import CreateContact from '@/components/Intents/CreateContact'
import ListContacts from '@/components/Intents/ListContacts'

const init = function () {
  const { root, store, client, lang, polyglot, appData } = setupApp()

  const intents = new Intents({ client: client })

  root.render(
    <AppProviders store={store} client={client} lang={lang} polyglot={polyglot}>
      <IntentHandler appData={appData} intents={intents}>
        <PickContacts action="PICK" type="io.cozy.contacts" />
        <CreateContact action="CREATE" type="io.cozy.contacts" />
        <ListContacts action="LIST" type="io.cozy.contacts" />
      </IntentHandler>
    </AppProviders>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  module.hot.accept('@/components/App', function () {
    init()
  })
}
