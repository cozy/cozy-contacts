import 'cozy-ui/transpiled/react/stylesheet.css'

import React from 'react'
import AppProviders from 'components/AppProviders'
import AppRouter from 'components/AppRouter'
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
