import React from 'react'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import { FieldInputWrapperPropTypes } from './FieldInputWrapper'

const FieldInputTextarea = props => {
  const { isMultiline, ...rest } = props
  return <TextField {...rest} multiline={isMultiline} minRows="2" />
}
FieldInputTextarea.propTypes = FieldInputWrapperPropTypes

export default FieldInputTextarea
