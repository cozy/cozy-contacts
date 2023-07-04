/* global cozy */
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useClient } from 'cozy-client'
import flag from 'cozy-flags'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'

import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'

const AppLayout = () => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  return (
    <Layout monocolumn="true">
      {isMobile && (
        <BarCenter>
          <MuiCozyTheme>
            <Typography variant="h4">{client.appMetadata.slug}</Typography>
          </MuiCozyTheme>
        </BarCenter>
      )}
      <Main>
        {flag('switcher') && <FlagSwitcher />}
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
