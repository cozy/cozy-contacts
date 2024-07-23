export const addField = fields => fields.push(undefined)

export const removeField = (fields, index) => {
  const isLastRemainingField = fields.length === 1

  if (isLastRemainingField) {
    fields.update(index, undefined)
  } else {
    fields.remove(index)
  }
}
