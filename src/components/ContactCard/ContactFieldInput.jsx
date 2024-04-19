import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Field } from 'react-final-form'

import {
  fieldInputAttributes,
  labelPropTypes
} from './ContactFields/ContactFieldsProptypes'
import { handleContactFieldInputProps } from './helpers'
import FieldInputWrapper from '../Form/FieldInputWrapper'
import HasValueCondition from '../Form/HasValueCondition'
import ContactAddressModal from '../Modals/ContactAddressModal'

const ContactFieldInput = ({
  name,
  labelPlaceholder,
  labelProps,
  attributes,
  ...props
}) => {
  const [hasBeenFocused, setHasBeenFocused] = useState(false)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const { subFields, ...restAttributes } = attributes

  const propsUpdated = handleContactFieldInputProps(props, {
    attributes,
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
              label={labelPlaceholder}
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
  labelPlaceholder: PropTypes.string,
  labelProps: labelPropTypes,
  attributes: fieldInputAttributes,
  // Destructuring props
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  labelProps: null,
  required: false,
  labelPlaceholder: ''
}

export default ContactFieldInput
