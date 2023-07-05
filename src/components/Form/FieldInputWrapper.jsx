import PropTypes from 'prop-types'
import React from 'react'

import { getFieldInput } from '../../helpers/getFieldInput'
import { fieldInputAttributes } from '../ContactCard/ContactFields/ContactFieldsProptypes'

const FieldInputWrapper = ({ input, attributes, ...props }) => {
  const { labelProps, ...restOfAttributes } = attributes || {}

  const Component = getFieldInput(attributes)

  return (
    <Component
      {...input}
      {...props}
      {...restOfAttributes}
      InputLabelProps={labelProps}
    />
  )
}

export const FieldInputWrapperPropTypes = {
  // See official documentation for more information: https://final-form.org/docs/react-final-form/types/FieldRenderProps
  input: PropTypes.object,
  //
  attributes: fieldInputAttributes,
  // Destructuring props
  // See official documentation for more information: https://final-form.org/docs/react-final-form/types/FieldRenderProps
  meta: PropTypes.object,
  //
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool
}

FieldInputWrapper.propTypes = FieldInputWrapperPropTypes
FieldInputWrapper.defaultProps = {
  variant: 'outlined',
  fullWidth: true
}

export default FieldInputWrapper
