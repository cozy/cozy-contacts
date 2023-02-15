import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import HasValueCondition from '../Form/HasValueCondition'
import FieldInputWrapper from '../Form/FieldInputWrapper'
import { fieldInputAttributes } from './ContactFields/ContactFieldsProptypes'

const ContactFieldInput = ({
  name,
  withLabel,
  labelPlaceholder,
  attributes,
  ...props
}) => {
  const [hasBeenFocused, setHasBeenFocused] = useState(false)

  const onFocus = () => {
    setHasBeenFocused(true)
  }

  return (
    <div className="u-flex u-flex-column-s u-flex-grow-1 u-pr-3">
      <Field
        {...props}
        attributes={attributes}
        name={name}
        onFocus={onFocus}
        component={FieldInputWrapper}
      />
      {withLabel && (
        <HasValueCondition name={name} otherCondition={hasBeenFocused}>
          <div className="u-mt-half-s u-ml-half u-ml-0-s u-flex-shrink-0 u-w-auto">
            <Field
              attributes={{ ...attributes, type: 'text' }}
              name={`${name}Label`}
              label={labelPlaceholder}
              onFocus={onFocus}
              component={FieldInputWrapper}
            />
          </div>
        </HasValueCondition>
      )}
    </div>
  )
}

ContactFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  withLabel: PropTypes.bool,
  labelPlaceholder: PropTypes.string,
  attributes: fieldInputAttributes,
  // Destructuring props
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  labelPlaceholder: ''
}

export default ContactFieldInput
