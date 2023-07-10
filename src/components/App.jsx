import React, { useEffect } from 'react'

import { RealTimeQueries, useClient } from 'cozy-client'

import SpinnerContact from './Common/Spinner'
import ContentWrapper from './ContentWrapper'
import useService from './Hooks/useService'
import cleanTrashedGroupsAndATrashedContacts from '../thunks/cleanTrashedGroupsAndATrashedContacts'

const ContactsApp = () => {
  const client = useClient()
  useEffect(() => {
    cleanTrashedGroupsAndATrashedContacts(client)
  }, [client])

  const hasServiceBeenLaunched = useService(
    'keepIndexFullNameAndDisplayNameUpToDate'
  )

  return (
    <>
      <RealTimeQueries doctype="io.cozy.contacts" />
      {hasServiceBeenLaunched === null ? (
        <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
      ) : (
        <ContentWrapper hasServiceBeenLaunched={hasServiceBeenLaunched} />
      )}
    </>
  )
}

export default ContactsApp
