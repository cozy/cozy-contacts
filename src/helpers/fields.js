import uniqueId from 'lodash/uniqueId'

export const addField = fields => fields.push({ fieldId: uniqueId('fieldId_') })

export const removeField = (fields, index) => {
  const isLastRemainingField = fields.length === 1

  if (isLastRemainingField) {
    fields.update(index, undefined)
  } else {
    fields.remove(index)
  }
}
