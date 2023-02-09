import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import FieldInputTextarea from '../components/Form/FieldInputTextarea'

export const getFieldInput = attributes => {
  if (attributes.isMultiline) {
    return FieldInputTextarea
  }
  return TextField
}
