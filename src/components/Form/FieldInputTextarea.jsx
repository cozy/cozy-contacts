import React from 'react'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import { FieldInputWrapperPropTypes } from './FieldInputWrapper'

const FieldInputTextarea = props => {
  return <TextField {...props} multiline minRows="2" />
}
FieldInputTextarea.propTypes = FieldInputWrapperPropTypes

export default FieldInputTextarea
