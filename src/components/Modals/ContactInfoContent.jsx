import PropTypes from 'prop-types'
import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { normalizeFields, getConnectedAccounts } from '../../helpers/contacts'
import ContactAccounts from '../ContactCard/ContactAccounts'
import ContactFields from '../ContactCard/ContactFields/ContactFields'
import ContactGroupsList from '../ContactCard/ContactGroups/ContactGroupList'
import { fullContactPropTypes } from '../ContactPropTypes'

const ContactInfoContent = ({ contact, allGroups }) => {
  const { t } = useI18n()

  const normalizedFields = normalizeFields(contact)
  const activeContactAccounts = getConnectedAccounts(contact)

  return (
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
  )
}

ContactInfoContent.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContactInfoContent
