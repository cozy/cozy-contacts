/* global cozy */
import React, { useEffect } from 'react'
import flow from 'lodash/flow'

import { useClient } from 'cozy-client'
import { RealTimeQueries } from 'cozy-client'

import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import { SelectedGroupProvider } from './Contexts/SelectedGroup'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import useFlags from './Hooks/useFlags'
import container from './AppContainer'
import ContentWrapper from './ContentWrapper'

const ContactsApp = ({ cleanTrashedGroups }) => {
  useFlags()
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  useEffect(() => {
    cleanTrashedGroups()
  }, [cleanTrashedGroups])

  return (
    <SelectedGroupProvider>
      <Layout monocolumn="true">
        {isMobile && (
          <BarCenter>
            <MuiCozyTheme>
              <Typography variant="h4">{client.appMetadata.slug}</Typography>
            </MuiCozyTheme>
          </BarCenter>
        )}
        <Main>
          <FlagSwitcher />
          <ContactsSelectionBar />
          <RealTimeQueries doctype="io.cozy.contacts" />
          <ContentWrapper />
          <Alerter t={t} />
          <ModalManager />
        </Main>
        <Sprite />
      </Layout>
    </SelectedGroupProvider>
  )
}

export default flow(container)(ContactsApp)
