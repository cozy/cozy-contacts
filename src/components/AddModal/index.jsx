import React, { useState } from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactForm from '../ContactCard/ContactForm'

const AddModal = ({ contacts, contact, onSubmit, onClick, onClose }) => {
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const [isBusy, setIsBusy] = useState(false)
  // Tip to prevent fields from being filled with old information for a short period of time during form submission.
  const [selfContact, setSelfContact] = useState(contact)

  /**
   * @param {import('cozy-client/types/types').IOCozyContact} formData - Contact document (except _id, _rev & _type attrs to create a new contact)
   */
  const handleFormSubmit = async formData => {
    setSelfContact(formData)
    setIsBusy(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setIsBusy(false)
      console.warn(err) // eslint-disable-line no-console
      showAlert({ severity: 'error', message: t('error.save') })
    }
  }

  return (
    <FixedDialog
      open
      onClose={onClose}
      title={contact ? t('edit-contact') : t('create_contact')}
      content={
        <ContactForm
          contacts={contacts}
          contact={selfContact}
          onSubmit={handleFormSubmit}
        />
      }
      actions={
        <>
          <Button variant="secondary" label={t('cancel')} onClick={onClose} />
          <Button
            className="u-ml-half"
            type="submit"
            label={t('save')}
            busy={isBusy}
            onClick={onClick}
          />
        </>
      }
    />
  )
}

export default AddModal
