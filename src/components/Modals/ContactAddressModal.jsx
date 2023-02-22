import React from 'react'
import PropTypes from 'prop-types'
import { Field, useForm } from 'react-final-form'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Buttons'

import FieldInputWrapper from '../Form/FieldInputWrapper'
import { fieldInputAttributes } from '../ContactCard/ContactFields/ContactFieldsProptypes'
import { makeFormattedAddressWithSubFields } from '../../helpers/contacts'

const ContactAddressModal = ({ onClose, name, subFields }) => {
  const { t } = useI18n()
  const { getFieldState, change } = useForm()

  const subFieldsState = subFields.map(subField =>
    getFieldState(`${name}${subField.name}`)
  )

  const onConfirm = () => {
    const hasBeenModified = subFieldsState.some(state => !state.pristine)
    if (!hasBeenModified) {
      return onClose()
    }

    const formattedAddress = makeFormattedAddressWithSubFields(
      subFieldsState,
      t
    )
    change(name, formattedAddress)

    onClose()
  }

  const onCancel = () => {
    subFieldsState.forEach(({ name, initial }) => change(name, initial))
    onClose()
  }

  return (
    <FixedDialog
      open
      onClose={onClose}
      size="small"
      title={t('fields.address')}
      content={subFields.map(subField => (
        <div key={subField.name} className="u-mt-1">
          <Field
            label={t(`fields.${subField.name}`)}
            attributes={{ type: subField.type }}
            name={`${name}${subField.name}`}
            component={FieldInputWrapper}
          />
        </div>
      ))}
      actions={
        <>
          <Button variant="secondary" label={t('cancel')} onClick={onCancel} />
          <Button className="u-ml-half" label={t('ok')} onClick={onConfirm} />
        </>
      }
    />
  )
}

ContactAddressModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  subFields: PropTypes.arrayOf(fieldInputAttributes).isRequired
}

export default ContactAddressModal
