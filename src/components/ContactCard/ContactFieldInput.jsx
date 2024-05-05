import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Field } from 'react-final-form'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  fieldInputAttributes,
  labelPropTypes
} from './ContactFields/ContactFieldsProptypes'
import { handleContactFieldInputProps } from './helpers'
import FieldInputWrapper from '../Form/FieldInputWrapper'
import HasValueCondition from '../Form/HasValueCondition'
import ContactAddressModal from '../Modals/ContactAddressModal'

const ContactFieldInput = ({ name, labelProps, attributes, ...props }) => {
  const [hasBeenFocused, setHasBeenFocused] = useState(false)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const { t } = useI18n()
  const { subFields, ...restAttributes } = attributes

  const propsUpdated = handleContactFieldInputProps(props, {
    name,
    setIsAddressDialogOpen
  })

  const onFocus = () => {
    setHasBeenFocused(true)
  }

  return (
    <div className="u-flex u-flex-column-s u-flex-grow-1 u-pr-3">
      <Field
        {...propsUpdated}
        attributes={restAttributes}
        name={name}
        onFocus={onFocus}
        component={FieldInputWrapper}
      />
      {isAddressDialogOpen && (
        <ContactAddressModal
          onClose={() => setIsAddressDialogOpen(false)}
          name={name}
          subFields={subFields}
        />
      )}
      {labelProps && (
        <HasValueCondition name={name} otherCondition={hasBeenFocused}>
          <div className="u-mt-half-s u-ml-half u-ml-0-s u-flex-shrink-0 u-w-auto">
            <Field
              style={{ minWidth: '200px' }}
              attributes={labelProps}
              withAddLabel={name !== 'gender'}
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
