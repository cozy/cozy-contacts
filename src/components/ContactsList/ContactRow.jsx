import React, { Component } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { models } from 'cozy-client'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import { TableRow } from 'cozy-ui/transpiled/react/Table'

import { fullContactPropTypes } from '../ContactPropTypes'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
import ContactWithSelection from './ContactSelection'
import ContactPhone from './Contacts/ContactPhone'
import ContactIdentity from './Contacts/ContactIdentity'
import ContactCozy from './Contacts/ContactCozy'
import ContactEmail from './Contacts/ContactEmail'

const { getPrimaryCozy, getPrimaryPhone, getPrimaryEmail } = models.contact

/**
 * Returns whether a document has been updated
 * @param {object} document - Initial document
 * @param {object} nextDocument - Potentially modified document
 * @returns {boolean}
 */
export const hasDocBeenUpdated = (document, nextDocument) =>
  document._rev !== nextDocument._rev ||
  get(document, 'cozyMetadata.updatedAt') !==
    get(nextDocument, 'cozyMetadata.updatedAt')

class ContactRow extends Component {
  shouldComponentUpdate(nextProps) {
    const { contact, ...otherProps } = this.props

    const hasOtherPropsBeenChanged = Object.entries(otherProps).some(
      ([key, otherProp]) => {
        return otherProp !== nextProps[key]
      }
    )

    if (
      hasDocBeenUpdated(contact, nextProps.contact) ||
      hasOtherPropsBeenChanged
    ) {
      return true
    }
    return false
  }

  render() {
    const {
      contact,
      showModal,
      breakpoints: { isMobile }
    } = this.props
    const email = getPrimaryEmail(contact) || undefined
    const phone = getPrimaryPhone(contact) || undefined
    const cozyUrl = getPrimaryCozy(contact) || undefined

    return (
      <TableRow
        className="contact"
        data-testid="contact-row"
        onClick={() => showModal(<ContactCardModal id={contact._id} />)}
      >
        <ContactWithSelection contact={contact} />
        <ContactIdentity contact={contact} />
        {!isMobile && <ContactEmail email={email} />}
        {!isMobile && <ContactPhone phone={phone} />}
        {!isMobile && <ContactCozy cozyUrl={cozyUrl} />}
      </TableRow>
    )
  }
}

ContactRow.propTypes = {
  contact: fullContactPropTypes.isRequired,
  showModal: PropTypes.func.isRequired
}
ContactRow.defaultProps = {
  selection: null
}

export default withBreakpoints()(withModal(ContactRow))
