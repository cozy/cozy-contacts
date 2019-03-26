import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ContactIdentity from './ContactIdentity'
import ContactGroupsList from '../ContactGroups/ContactGroupList'
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

const ContactCard = props => {
  const { t, contact, renderHeader, renderBody, allGroups } = props
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
    <>
      {renderHeader(
        <ContactIdentity contact={contact} allGroups={allGroups} />
      )}
      {renderBody(
        <>
          <ContactGroupsList
            contact={contact}
            allGroups={allGroups}
            title={t('contact_group')}
          />
          <ContactFields fields={normalizedFields} title={t('contact_info')} />
          {activeContactAccounts.length > 0 ? (
            <ContactAccounts accounts={activeContactAccounts} />
          ) : null}
        </>
      )}
    </>
  )
}

ContactCard.propTypes = {
  contact: fullContactPropTypes.isRequired,
  renderHeader: PropTypes.func,
  renderBody: PropTypes.func,
  allGroups: PropTypes.array.isRequired
}

ContactCard.defaultProps = {
  renderHeader: children => children,
  renderBody: children => children
}

export default translate()(ContactCard)
