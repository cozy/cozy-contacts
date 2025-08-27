import cx from 'classnames'
import uniqueId from 'lodash/uniqueId'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Field } from 'react-final-form'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  fieldInputAttributes,
  labelPropTypes
} from './ContactFields/ContactFieldsProptypes'
import { RelatedContactList } from './ContactForm/RelatedContactList'
import { handleContactFieldInputProps } from './helpers'
import FieldInputWrapper from '../Form/FieldInputWrapper'
import HasValueCondition from '../Form/HasValueCondition'
import ContactAddressModal from '../Modals/ContactAddressModal'

import styles from '@/styles/contactForm.styl'

const ContactFieldInput = ({
  name,
  labelProps,
  attributes: { subFields, ...restAttributes },
  contacts,
  error,
  helperText,
  label,
  required
}) => {
  const [id] = useState(uniqueId('field_')) // state only use to generate id once and not at each render
  const [hasBeenFocused, setHasBeenFocused] = useState(false)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [isRelatedContactDialogOpen, setIsRelatedContactDialogOpen] =
    useState(false)
  const { t } = useI18n()

  const { inputProps, InputProps, onClick } = handleContactFieldInputProps(
    { error, helperText, label, required },
    {
      name,
      setIsAddressDialogOpen,
      setIsRelatedContactDialogOpen
    }
  )

  const onFocus = () => {
    setHasBeenFocused(true)
  }

  return (
    <div
      className={cx(
        styles['contact-form-field__wrapper'],
        'u-flex',
        'u-flex-column-s'
      )}
    >
      <Field
        inputProps={inputProps}
        InputProps={InputProps}
        required={required}
        error={error}
        helperText={helperText}
        label={label}
        id={id}
        attributes={restAttributes}
        name={name}
        component={FieldInputWrapper}
        onFocus={onFocus}
        onClick={onClick}
      />
      {isAddressDialogOpen && (
        <ContactAddressModal
          onClose={() => setIsAddressDialogOpen(false)}
          name={name}
          subFields={subFields}
        />
      )}
      {isRelatedContactDialogOpen && (
        <RelatedContactList
          onClose={() => setIsRelatedContactDialogOpen(false)}
          name={name}
          contacts={contacts}
        />
      )}
      {labelProps && (
        <HasValueCondition name={name} otherCondition={hasBeenFocused}>
          <div className="u-mt-half-s u-ml-half u-ml-0-s u-flex-shrink-0 u-w-auto u-miw-4">
            <Field
              attributes={labelProps}
              name={`${name}Label`}
              label={t('fields.label')}
              component={FieldInputWrapper}
              onFocus={onFocus}
            />
          </div>
        </HasValueCondition>
      )}
    </div>
  )
}

ContactFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelProps: labelPropTypes,
  attributes: fieldInputAttributes,
  contacts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }),
  // Destructuring props
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  labelProps: null,
  required: false
}

export default ContactFieldInput
