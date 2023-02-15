import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import FieldInputTextarea from '../components/Form/FieldInputTextarea'
import FieldInputSelect from '../components/Form/FieldInputSelect'

export const getFieldInput = attributes => {
  if (attributes.isMultiline) {
    return FieldInputTextarea
  }
  if (attributes.select) {
    return FieldInputSelect
  }
  return TextField
}
