import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { models } from 'cozy-client'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'

import { fullContactPropTypes } from '../ContactPropTypes'
import withModalContainer from '../HOCs/withModal'
import ContactWithSelection from './ContactSelection'
import ContactPhone from './Contacts/ContactPhone'
import ContactIdentity from './Contacts/ContactIdentity'
import ContactCozy from './Contacts/ContactCozy'
import ContactEmail from './Contacts/ContactEmail'

const { getPrimaryCozy, getPrimaryPhone, getPrimaryEmail } = models.contact

class ContactRow extends Component {
  render() {
    const {
      contact,
      onClick,
      breakpoints: { isMobile }
    } = this.props
    const email = getPrimaryEmail(contact) || undefined
    const phone = getPrimaryPhone(contact) || undefined
    const cozyUrl = getPrimaryCozy(contact) || undefined

    return (
      <div className="contact" onClick={onClick}>
        <ContactWithSelection contact={contact} />
        <ContactIdentity contact={contact} />
        {!isMobile && <ContactEmail email={email} />}
        {!isMobile && <ContactPhone phone={phone} />}
        {!isMobile && <ContactCozy cozyUrl={cozyUrl} />}
      </div>
    )
  }
}

ContactRow.propTypes = {
  contact: fullContactPropTypes.isRequired,
  onClick: PropTypes.func
}
ContactRow.defaultProps = {
  selection: null,
  onClick: null
}

export default withBreakpoints()(withModalContainer(ContactRow))
