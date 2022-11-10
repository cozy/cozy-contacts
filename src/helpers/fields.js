export const addField = fields => fields.push(undefined)

export const removeField = (fields, index) => {
  const isLastRemainignField = fields.length === 1
  fields.remove(index)
  if (isLastRemainignField) addField(fields)
}
