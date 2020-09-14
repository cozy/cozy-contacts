/* global cozy */
import React, { useState, useEffect, useCallback } from 'react'
import { PropTypes } from 'prop-types'
import flow from 'lodash/flow'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Title } from 'cozy-ui/transpiled/react/Text'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import flag, { FlagSwitcher } from 'cozy-flags'
import log from 'cozy-logger'

import withContactsMutations from '../connections/allContacts'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import useFlags from './Hooks/useFlags'
import container from './AppContainer'
import ContentWrapper from './ContentWrapper'
import SpinnerContact from './Components/Spinner'
import { fetchNormalizedServiceByName } from '../helpers/fetches'

const ContactsApp = props => {
  // HACK to avoid CozyBar error :
  // you tried to use the CozyBar API (BarCenter) but the CozyBar is not initialised yet via cozy.bar.init
  // TODO : TO BE REMOVED
  const [cozyBarHack, setcozyBarHack] = useState(false)

  const [serviceToLaunch, setServiceToLaunch] = useState(null)
  const [hasServiceBeenLaunched, setHasServiceBeenLaunched] = useState(null)

  useFlags()
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar
  const { deleteContact, cleanTrashedGroups } = props

  const setStateOfServiceToLaunch = useCallback(async () => {
    const serviceToLaunch = await fetchNormalizedServiceByName(
      client,
      'keepIndexFullNameAndDisplayNameUpToDate'
    )
    setServiceToLaunch(serviceToLaunch)
    setHasServiceBeenLaunched(
      get(serviceToLaunch, 'current_state.last_success', '').length > 0
    )
  }, [client])

  useEffect(() => {
    cleanTrashedGroups()
  }, [])

  useEffect(() => {
    setStateOfServiceToLaunch()
  }, [setStateOfServiceToLaunch])

  useEffect(() => {
    // HACK to be removed
    setTimeout(() => {
      setcozyBarHack(true)
    }, 0)
  }, [])

  // start keepIndexFullNameAndDisplayNameUpToDate service
  // if never launched before
  if (serviceToLaunch && hasServiceBeenLaunched === false) {
    log(
      'info',
      `Executing keepIndexFullNameAndDisplayNameUpToDate service by Contacts app`
    )
    client.collection('io.cozy.triggers').launch(serviceToLaunch)
  }

  return (
    <Layout monocolumn="true">
      {isMobile && cozyBarHack && (
        <BarCenter>
          <Title>
            <span className={'fil-path-title'}>Contacts</span>
          </Title>
        </BarCenter>
      )}
      <Main>
        {flag('switcher') && <FlagSwitcher />}
        <ContactsSelectionBar trashAction={deleteContact} />
        {hasServiceBeenLaunched === null ? (
          <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
        ) : (
          <ContentWrapper hasServiceBeenLaunched={hasServiceBeenLaunched} />
        )}
        <Alerter t={t} />
        <ModalManager />
      </Main>
      <IconSprite />
    </Layout>
  )
}

ContactsApp.propTypes = {
  deleteContact: PropTypes.func.isRequired
}

export default flow(
  withContactsMutations,
  container
)(ContactsApp)
