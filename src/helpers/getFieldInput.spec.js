import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import FieldInputSelect from '../components/Form/FieldInputSelect'
import FieldInputTextarea from '../components/Form/FieldInputTextarea'
import { fields } from '../components/ContactCard/ContactForm/fieldsConfig'
import { getFieldInput } from './getFieldInput'

describe('getFieldInput', () => {
  it('should return FieldInputSelect component if "select" attribute defined', () => {
    const attributesWithSelect = fields.filter(f => f.select)

    expect(attributesWithSelect).not.toHaveLength(0)

    for (const attributes of attributesWithSelect) {
      const fieldInput = getFieldInput(attributes)
      expect(fieldInput).toEqual(FieldInputSelect)
    }
  })
  it('should return FieldInputTextarea component if "isMultiline" attribute defined', () => {
    const attributesWithSelect = fields.filter(f => f.isMultiline)

    expect(attributesWithSelect).not.toHaveLength(0)

    for (const attributes of attributesWithSelect) {
      const fieldInput = getFieldInput(attributes)
      expect(fieldInput).toEqual(FieldInputTextarea)
    }
  })
  it('should return TextField component if "isMultiline" and "select" attributes is undefined', () => {
    const attributesWithSelect = fields.filter(f => !f.isMultiline && !f.select)

    expect(attributesWithSelect).not.toHaveLength(0)

    for (const attributes of attributesWithSelect) {
      const fieldInput = getFieldInput(attributes)
      expect(fieldInput).toEqual(TextField)
    }
  })
})
