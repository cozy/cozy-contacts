import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ContactIdentity from './ContactIdentity'
import ContactGroupsList from '../ContactGroups/ContactGroupList'
import ContactFields from './ContactFields'
import { fullContactPropTypes } from '../ContactPropTypes'
import { normalizeFields, getConnectedAccounts } from '../../helpers/contacts'
import ContactAccounts from './ContactAccounts'

const ContactCard = ({ t, contact, renderHeader, renderBody, allGroups }) => {
  const normalizedFields = normalizeFields(contact)
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
