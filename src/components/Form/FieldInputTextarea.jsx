import React from 'react'

import TextField from 'cozy-ui/transpiled/react/TextField'

import { FieldInputWrapperPropTypes } from './fieldInputType'

const FieldInputTextarea = props => {
  const { isMultiline, ...rest } = props
  return <TextField {...rest} multiline={isMultiline} minRows="2" />
}
FieldInputTextarea.propTypes = FieldInputWrapperPropTypes

export default FieldInputTextarea
