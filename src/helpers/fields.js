export const addField = fields => fields.push(undefined)

export const removeField = (fields, index) => {
  const isLastRemainignField = fields.length === 1

  if (isLastRemainignField) {
    fields.update(index, undefined)
  } else {
    fields.remove(index)
  }
}
