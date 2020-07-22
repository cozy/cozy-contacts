import React from 'react'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

export const DumbField = ({
  input,
  type,
  labelProps,
  isMultiline,
  ...rest
}) => (
  <TextField
    {...input}
    {...rest}
    type={type}
    variant="outlined"
    fullWidth={true}
    multiline={isMultiline}
    rows="2"
    InputLabelProps={labelProps}
    aria-label="dumbField"
  />
)
