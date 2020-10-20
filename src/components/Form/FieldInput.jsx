import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

const FieldInput = ({ input, type, labelProps, isMultiline, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    type={type}
    variant="outlined"
    fullWidth={true}
    multiline={isMultiline}
    rows="2"
    InputLabelProps={labelProps}
  />
)

FieldInput.propTypes = {
  type: PropTypes.string,
  labelProps: PropTypes.object,
  isMultiline: PropTypes.bool
}

export default FieldInput
