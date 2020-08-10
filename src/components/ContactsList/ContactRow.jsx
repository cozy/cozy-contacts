import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'

import withModalContainer from '../HOCs/withModal'
import contactPropTypes from '../ContactPropTypes'
import ContactWithSelection from './ContactSelection'

import ContactPhone from './Contacts/ContactPhone'
import ContactIdentity from './Contacts/ContactIdentity'
import ContactCozy from './Contacts/ContactCozy'
import ContactEmail from './Contacts/ContactEmail'

const getPrimaryOrFirst = (arr = [{}]) => arr.find(obj => obj.primary) || arr[0]

class ContactRow extends Component {
  render() {
    const {
      contact,
      onClick,
      breakpoints: { isMobile }
    } = this.props
    const { number: phone } = getPrimaryOrFirst(contact.phone) || {
      number: undefined
    }

    const { address: email } = getPrimaryOrFirst(contact.email) || {
      address: undefined
    }
    const name = contact.name || {}
    const isMyself = contact.metadata ? !!contact.metadata.me : false
    const cozyUrl = getPrimaryOrFirst(contact.cozy) || { url: undefined }
    return (
      <div className="contact" onClick={onClick}>
        <ContactWithSelection contact={contact} />
        <ContactIdentity name={name} myself={isMyself} />
        {!isMobile && <ContactEmail email={email} />}
        {!isMobile && <ContactPhone phone={phone} />}
        {!isMobile && <ContactCozy cozyUrl={cozyUrl.url} />}
      </div>
    )
  }
}
ContactRow.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    email: PropTypes.arrayOf(contactPropTypes.email),
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    metadata: contactPropTypes.metadata
  }).isRequired,

  onClick: PropTypes.func
}
ContactRow.defaultProps = {
  selection: null,
  onClick: null
}

export default withBreakpoints()(withModalContainer(ContactRow))
