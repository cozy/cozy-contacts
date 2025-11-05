/* eslint-disable import/order */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui-plus/dist/stylesheet.css'
import 'cozy-bar/dist/stylesheet.css'

import AppProviders from '@/components/AppProviders'
import AppRouter from '@/components/AppRouter'
import React from 'react'

import setupApp from './setupApp'
import '../../styles/index.styl'

const init = () => {
  const { root, store, client, lang, polyglot } = setupApp()

  root.render(
    <AppProviders store={store} client={client} lang={lang} polyglot={polyglot}>
      <AppRouter />
    </AppProviders>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
