import React from 'react'
import { PropTypes } from 'prop-types'

import { Content } from 'cozy-ui/transpiled/react/Layout'

import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import SpinnerContact from './Components/Spinner'
import fetchSortedContacts from './Hooks/fetchSortedContacts'

const ContentWrapper = ({ hasServiceBeenLaunched }) => {
  const [isFetchFinished, contacts] = fetchSortedContacts(
    hasServiceBeenLaunched
  )

  if (!isFetchFinished) {
    return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
  }

  return (
    <>
      {contacts.length >= 1 && <Header right={<Toolbar />} />}
      <Content>
        <ContactsList contacts={contacts} />
      </Content>
    </>
  )
}

ContentWrapper.propTypes = {
  hasServiceBeenLaunched: PropTypes.bool
}

export default ContentWrapper
