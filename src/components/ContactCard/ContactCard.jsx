import React from 'react'
import PropTypes from 'prop-types'
import ContactIdentity from './ContactIdentity'
import ContactFields from './ContactFields'
import { fullContactPropTypes } from '../ContactPropTypes'
import {
  getFieldListFrom,
  filterFieldList,
  groupUnsupportedFields,
  supportedFieldsInOrder,
  orderFieldList,
  makeValuesArray,
  getConnectedAccounts
} from '../../helpers/contacts'
import ContactAccounts from './ContactAccounts'

const ContactCard = ({ title, contact, renderHeader, renderBody }) => {
  const fields = getFieldListFrom(contact)
  const filteredFields = filterFieldList(fields)
  const groupedFields = groupUnsupportedFields(
    filteredFields,
    supportedFieldsInOrder
  )
  const orderedFields = orderFieldList(groupedFields, supportedFieldsInOrder)
  const normalizedFields = makeValuesArray(orderedFields)

  const activeContactAccounts = getConnectedAccounts(contact)

  return (
    <div>
      {renderHeader(<ContactIdentity contact={contact} />)}
      {renderBody(
        <>
          <ContactFields fields={normalizedFields} title={title} />
          {activeContactAccounts.length > 0 ? (
            <ContactAccounts accounts={activeContactAccounts} />
          ) : null}
        </>
      )}
    </div>
  )
}

ContactCard.propTypes = {
  contact: fullContactPropTypes.isRequired,
  title: PropTypes.string.isRequired,
  renderHeader: PropTypes.func,
  renderBody: PropTypes.func
}

ContactCard.defaultProps = {
  renderHeader: children => children,
  renderBody: children => children
}

export default ContactCard
