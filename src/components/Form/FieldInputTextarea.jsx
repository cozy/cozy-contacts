import React from 'react'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import { FieldInputPropTypes } from './FieldInput'

const FieldInputTextarea = props => {
  return <TextField {...props} multiline minRows="2" />
}
FieldInputTextarea.propTypes = FieldInputPropTypes

export default FieldInputTextarea
