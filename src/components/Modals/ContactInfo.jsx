import React from 'react'
import { PropTypes } from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ModalHeader, ModalContent } from 'cozy-ui/transpiled/react/Modal'
import Button from 'cozy-ui/transpiled/react/Button'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactCard from '../ContactCard/ContactCard'
import ContactGroups from '../ContactCard/ContactGroups'

const ContactInfo = ({
  contact,
  allGroups,
  toggleEditMode,
  toggleConfirmDeleteModal
}) => {
  const { t } = useI18n()
  return (
    <ContactCard
      contact={contact}
      allGroups={allGroups}
      renderHeader={children => (
        <ModalHeader className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s u-flex-justify-between">
          {children}
          <div className="u-flex u-flex-row u-ml-0-s u-mr-3 u-mr-0-s">
            <ContactGroups contact={contact} allGroups={allGroups} />
            <Button
              theme="secondary"
              extension="narrow"
              icon="rename"
              iconOnly
              label={t('edit')}
              size="small"
              onClick={toggleEditMode}
            />
            <Button
              theme="secondary"
              extension="narrow"
              icon="trash"
              iconOnly
              label={t('delete')}
              size="small"
              onClick={toggleConfirmDeleteModal}
            />
          </div>
        </ModalHeader>
      )}
      renderBody={children => <ModalContent>{children}</ModalContent>}
    />
  )
}

ContactInfo.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired
}

export default ContactInfo
