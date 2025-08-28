import React from 'react'

import TextField from 'cozy-ui/transpiled/react/TextField'

import TextFieldCustomLabelSelect from './TextFieldCustomLabelSelect'
import TextFieldSelect from './TextFieldSelect'
import { FieldInputWrapperPropTypes } from '../types'

// component used to flatten props to ensure compatibility
// between Field from react-final-form and TextField from Mui
const FieldInputWrapper = ({
  input,
  attributes,
  variant,
  fullWidth,
  ...props
}) => {
  const Component = attributes.customLabelOptions
    ? TextFieldCustomLabelSelect
    : attributes?.select
    ? TextFieldSelect
    : TextField

  return (
    <Component
      {...attributes}
      {...input}
      {...props}
      variant={variant}
      fullWidth={fullWidth}
      minRows="2"
    />
  )
}

FieldInputWrapper.propTypes = FieldInputWrapperPropTypes
FieldInputWrapper.defaultProps = {
  variant: 'outlined',
  fullWidth: true
}

export default FieldInputWrapper
