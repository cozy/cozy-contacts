import union from 'lodash/union'

import manifest from '../../manifest.webapp'
import { ADD_COZY_METADATA } from '../constants'

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
        'cozyMetadata',
        'id',
        'metadata',
        'relationships',
        'groups',
        'accounts'
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

export function getUpdatedContact(oldContact, newContact) {
  const now = new Date().toISOString()
  if (oldContact) {
    const cozyMetadata = ADD_COZY_METADATA
      ? {
          cozyMetadata: {
            ...oldContact.cozyMetadata,
            updatedAt: now,
            updatedByApps: union(
              [manifest.name],
              oldContact.cozyMetadata.updatedByApps
            )
          }
        }
      : {}
    return {
      _type: oldContact._type,
      _id: oldContact._id,
      _rev: oldContact._rev,
      ...cozyMetadata,
      ...newContact
    }
  } else {
    const cozyMetadata = ADD_COZY_METADATA
      ? {
          cozyMetadata: {
            createdAt: now,
            updatedAt: now,
            updatedByApps: [manifest.name]
          }
        }
      : {}
    return {
      ...cozyMetadata,
      ...newContact
    }
  }
}
