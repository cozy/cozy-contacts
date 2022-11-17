import React, { useEffect } from 'react'
import flow from 'lodash/flow'

import { RealTimeQueries } from 'cozy-client'

import container from './AppContainer'
import ContentWrapper from './ContentWrapper'

const ContactsApp = ({ cleanTrashedGroups }) => {
  useEffect(() => {
    cleanTrashedGroups()
  }, [cleanTrashedGroups])

  return (
    <>
      <RealTimeQueries doctype="io.cozy.contacts" />
      <ContentWrapper />
    </>
  )
}

export default flow(container)(ContactsApp)
