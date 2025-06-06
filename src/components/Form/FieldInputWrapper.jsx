import React from 'react'

import { FieldInputWrapperPropTypes } from './fieldInputType'
import { getFieldInput } from '../../helpers/getFieldInput'

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

FieldInputWrapper.propTypes = FieldInputWrapperPropTypes
FieldInputWrapper.defaultProps = {
  variant: 'outlined',
  fullWidth: true
}

export default FieldInputWrapper
