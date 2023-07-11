import TextField from 'cozy-ui/transpiled/react/TextField'

import FieldInputSelect from '../components/Form/FieldInputSelect'
import FieldInputTextarea from '../components/Form/FieldInputTextarea'

export const getFieldInput = attributes => {
  if (attributes.isMultiline) {
    return FieldInputTextarea
  }
  if (attributes.select) {
    return FieldInputSelect
  }
  return TextField
}
