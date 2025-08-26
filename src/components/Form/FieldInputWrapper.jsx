import React from 'react'

import TextField from 'cozy-ui/transpiled/react/TextField'

import { FieldInputWrapperPropTypes } from './fieldInputType'

import FieldInputSelect from '@/components/Form/FieldInputSelect'

const FieldInputWrapper = ({ input, attributes, ...props }) => {
  const { labelProps, options, multiline, ...restOfAttributes } =
    attributes || {}

  const Component = options ? FieldInputSelect : TextField

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
