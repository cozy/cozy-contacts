import flow from 'lodash/flow'
import React, { useEffect } from 'react'

import { RealTimeQueries } from 'cozy-client'

import container from './AppContainer'
import SpinnerContact from './Common/Spinner'
import ContentWrapper from './ContentWrapper'
import useService from './Hooks/useService'

const ContactsApp = ({ cleanTrashedGroups }) => {
  useEffect(() => {
    cleanTrashedGroups()
  }, [cleanTrashedGroups])

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

export default flow(container)(ContactsApp)
