/* global cozy */
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useClient } from 'cozy-client'
import flag from 'cozy-flags'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

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
          <CozyTheme>
            <Typography variant="h4">{client.appMetadata.slug}</Typography>
          </CozyTheme>
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
