export const supportedFieldsInOrder = [
  'phone',
  'email',
  'address',
  'cozy',
  'company',
  'birthday',
  'note'
]

export const getFieldListFrom = contact =>
  Object.keys(contact).map(type => ({ type, values: contact[type] }))
export const filterFieldList = fields =>
  fields.filter(
    field =>
      [
        'name',
        'fullname',
        '_id',
        '_rev',
        '_type',
        'id',
        'metadata',
        'relationships',
        'groups'
      ].includes(field.type) === false && field.values
  )
export const groupUnsupportedFields = (fields, supportedFieldTypes) => {
  const supportedFields = fields.filter(field =>
    supportedFieldTypes.includes(field.type)
  )
  const unsupportedFields = fields.filter(
    field => !supportedFieldTypes.includes(field.type)
  )
  return supportedFields.concat([
    {
      type: 'other',
      values: unsupportedFields.map(unsupportedField => unsupportedField.values)
    }
  ])
}
export const orderFieldList = (fields, fieldsInOrder) =>
  fields.slice().sort((a, b) => {
    const indexA = fieldsInOrder.includes(a.type)
      ? fieldsInOrder.indexOf(a.type)
      : fieldsInOrder.length
    const indexB = fieldsInOrder.includes(b.type)
      ? fieldsInOrder.indexOf(b.type)
      : fieldsInOrder.length
    return indexA - indexB
  })
export const makeValuesArray = fields =>
  fields.map(field => ({
    ...field,
    values: Array.isArray(field.values) ? field.values : [field.values]
  }))

export const getInitials = name => {
  if (!name) return ''
  return ['givenName', 'familyName']
    .map(part => name[part] || '')
    .map(name => name[0])
    .join('')
}

export const getFullContactName = name => {
  if (!name) return ''
  return [
    'namePrefix',
    'givenName',
    'additionalName',
    'familyName',
    'nameSuffix'
  ]
    .map(part => name[part])
    .join(' ')
    .trim()
}
