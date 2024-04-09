import TextField from 'cozy-ui/transpiled/react/TextField'

import { getFieldInput } from './getFieldInput'
import { fields } from '../components/ContactCard/ContactForm/fieldsConfig'
import FieldInputSelect from '../components/Form/FieldInputSelect'
import FieldInputTextarea from '../components/Form/FieldInputTextarea'

describe('getFieldInput', () => {
  it('should return FieldInputSelect component if "options" attribute defined', () => {
    const attributesWithSelect = fields.filter(f => f.options)

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
  it('should return TextField component if "isMultiline" and "options" attributes is undefined', () => {
    const attributesWithSelect = fields.filter(
      f => !f.isMultiline && !f.options
    )

    expect(attributesWithSelect).not.toHaveLength(0)

    for (const attributes of attributesWithSelect) {
      const fieldInput = getFieldInput(attributes)
      expect(fieldInput).toEqual(TextField)
    }
  })
})
