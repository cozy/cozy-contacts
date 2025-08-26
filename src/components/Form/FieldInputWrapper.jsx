import React from 'react'

import TextField from 'cozy-ui/transpiled/react/TextField'

import { FieldInputWrapperPropTypes } from './fieldInputType'

import TextFieldSelect from '@/components/Form/TextFieldSelect'

const FieldInputWrapper = ({ input, attributes, ...props }) => {
  const { labelProps, options, multiline, ...restOfAttributes } =
    attributes || {}

  const Component = options ? TextFieldSelect : TextField

  return (
    <Component
      {...input}
      {...props}
      {...restOfAttributes}
      options={options}
      InputLabelProps={labelProps}
      multiline={multiline}
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
