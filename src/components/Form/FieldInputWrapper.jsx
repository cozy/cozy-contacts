import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import { fieldInputAttributes } from '../ContactCard/ContactFields/ContactFieldsProptypes'
import FieldInputTextarea from './FieldInputTextarea'

const FieldInputWrapper = ({ input, attributes, ...props }) => {
  const { labelProps, isMultiline, ...attrs } = attributes || {}

  const Component = isMultiline ? FieldInputTextarea : TextField

  return (
    <Component {...input} {...props} {...attrs} InputLabelProps={labelProps} />
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
