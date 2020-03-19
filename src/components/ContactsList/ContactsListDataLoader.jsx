import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import ContactsList from '.'
import SpinnerContact from '../Components/Spinner'

class ContactsListDataLoader extends Component {
  componentDidUpdate() {
    if (this.props.hasMore) {
      this.props.fetchMore()
    }
  }
  render() {
    const { fetchStatus, hasMore, contacts, allGroups } = this.props

    if (fetchStatus === 'loaded' && hasMore === false) {
      return <ContactsList contacts={contacts} allGroups={allGroups} />
    } else {
      return <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
    }
  }
}
ContactsListDataLoader.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  contacts: PropTypes.array.isRequired,
  fetchMore: PropTypes.func.isRequired,
  allGroups: PropTypes.array.isRequired,
}
export default ContactsListDataLoader
