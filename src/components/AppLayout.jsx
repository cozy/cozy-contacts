import React from 'react'
import { Outlet } from 'react-router-dom'

import { BarCenter } from 'cozy-bar'
import { BarComponent } from 'cozy-bar'
import { useClient } from 'cozy-client'
import CozyDevTools from 'cozy-devtools'
import flag from 'cozy-flags'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'

const AppLayout = ({ withTopBar }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()

  return (
    <Layout monoColumn withTopBar={withTopBar}>
      {flag('debug') && <CozyDevTools />}
      {withTopBar && <BarComponent />}
      {isMobile && withTopBar && (
        <BarCenter>
          <Typography variant="h4">{client.appMetadata.slug}</Typography>
        </BarCenter>
      )}
      <Main>
        <ContactsSelectionBar />
        <Outlet />
        <ModalManager />
      </Main>
      <Sprite />
    </Layout>
  )
}

export default AppLayout
