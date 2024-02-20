import React from 'react'
import { Outlet } from 'react-router-dom'

import { BarCenter } from 'cozy-bar'
import { BarComponent } from 'cozy-bar'
import { useClient } from 'cozy-client'
import CozyDevTools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'

const AppLayout = () => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  return (
    <Layout monocolumn="true">
      {flag('debug') && <CozyDevTools />}
      <BarComponent />
      {isMobile && (
        <BarCenter>
          <Typography variant="h4">{client.appMetadata.slug}</Typography>
        </BarCenter>
      )}
      <Main>
        <ContactsSelectionBar />
        <Outlet />
        <Alerter t={t} />
        <ModalManager />
      </Main>
      <Sprite />
    </Layout>
  )
}

export default AppLayout
