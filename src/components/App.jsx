/* global cozy */
import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import flow from 'lodash/flow'

import { Main, Layout } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Title } from 'cozy-ui/transpiled/react/Text'
import { useI18n, useBreakpoints } from 'cozy-ui/transpiled/react'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import flag, { FlagSwitcher } from 'cozy-flags'

import withContactsMutations from '../connections/allContacts'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import useFlags from './Hooks/useFlags'
import container from './AppContainer'
import ContentWrapper from './ContentWrapper'

const ContactsApp = props => {
  // HACK to avoid CozyBar error :
  // you tried to use the CozyBar API (BarCenter) but the CozyBar is not initialised yet via cozy.bar.init
  // TODO : TO BE REMOVED
  const [cozyBarHack, setcozyBarHack] = useState(false)

  useFlags()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar
  const { deleteContact, cleanTrashedGroups } = props

  useEffect(() => {
    cleanTrashedGroups()
  }, [cleanTrashedGroups])

  useEffect(() => {
    // HACK to be removed
    setTimeout(() => {
      setcozyBarHack(true)
    }, 0)
  }, [])

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
        <ContentWrapper />
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
