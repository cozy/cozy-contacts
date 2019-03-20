import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'cozy-client'
import { allGroupsQuery } from '../../connections/allGroups'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Spinner } from 'cozy-ui/transpiled/react'
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

const ContactCard = ({ t, contact, renderHeader, renderBody }) => {
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
          <Query query={allGroupsQuery}>
            {({ data: allGroups, fetchStatus }) => {
              if (fetchStatus === 'loaded') {
                return (
                  <ContactGroupsList
                    contact={contact}
                    allGroups={allGroups}
                    title={t('contact_group')}
                  />
                )
              } else {
                return <Spinner />
              }
            }}
          </Query>
          <ContactFields fields={normalizedFields} title={t('contact_info')} />
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

export default translate()(ContactCard)
