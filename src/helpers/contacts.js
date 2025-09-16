import sortBy from 'lodash/sortBy'

import { HasMany } from 'cozy-client'
import { getHasManyItem } from 'cozy-client/dist/associations/HasMany'
import { updateIndexFullNameAndDisplayName } from 'cozy-client/dist/models/contact'

export const supportedFieldsInOrder = [
  'phone',
  'email',
  'impp',
  'address',
  'cozy',
  'company',
  'jobTitle',
  'birthday',
  'relationship',
  'note'
]

export const getFieldListFrom = contact =>
  Object.keys(contact).map(type => ({ type, values: contact[type] }))

export const filterFieldList = fields =>
  fields.filter(
    field =>
      [
        '_id',
        '_rev',
        '_type',
        'accounts',
        'attributes',
        'birthplace',
        'cozyMetadata',
        'displayName',
        'fullname',
        'gender',
        'groups',
        'id',
        'indexes',
        'links',
        'maritalStatus',
        'me',
        'meta',
        'metadata',
        'name',
        'relationships',
        'type',
        'related'
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

export const makeRelatedContactField = contact => {
  if (!contact.related) return null

  const relatedFieldValues = contact.related.data.flatMap(related => {
    const relatedRelationships = getHasManyItem(contact, 'related', related._id)
    return relatedRelationships.metadata.relationTypes.map(type => {
      return {
        label: type,
        name: related.displayName,
        id: related._id
      }
    })
  })

  return {
    type: 'relationship', // To match the translation key already in place
    values: relatedFieldValues
  }
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

export const getConnectedAccounts = contact =>
  contact.accounts.data.filter(account => account.sourceAccount !== null)

export const normalizeFields = contact => {
  const fields = getFieldListFrom(contact)
  const filteredFields = filterFieldList(fields, contact)
  const relatedField = makeRelatedContactField(contact)
  if (relatedField) {
    filteredFields.push(relatedField)
  }
  const groupedFields = groupUnsupportedFields(
    filteredFields,
    supportedFieldsInOrder
  )
  const orderedFields = orderFieldList(groupedFields, supportedFieldsInOrder)
  return makeValuesArray(orderedFields)
}

/**
 * Get contacts with indexes,
 * harmonize contacts without indexes and
 * sort them by indexes
 * @param {array} contactsWithIndexes - contacts with indexes
 * @param {array} contactsWithNoIndexes - contacts without indexes
 * @returns {array} contacts with indexes and sorted
 */
export const harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl = (
  contactsWithIndexes,
  contactsWithNoIndexes
) => {
  const updatedContacts = contactsWithNoIndexes.map(contact =>
    updateIndexFullNameAndDisplayName(contact)
  )
  const concatedContacts = contactsWithIndexes.concat(updatedContacts)
  const sortedContacts = sortBy(concatedContacts, [
    'indexes.byFamilyNameGivenNameEmailCozyUrl'
  ])

  return sortedContacts
}

/**
 * Sort contacts list by myself and favorites
 * @param {object[]} contacts - contacts list
 * @returns {object[]}
 */
const moveMyselfAndFavoritesToFirstPosition = contacts => {
  return sortBy(contacts, [
    contact => !contact.me,
    contact => !contact.cozyMetadata?.favorite
  ])
}

/**
 * Sort and rework contacts according to 'keepIndexFullNameAndDisplayNameUpToDate' service status
 * @param {bool} hasServiceBeenLaunched - 'keepIndexFullNameAndDisplayNameUpToDate' service launch status
 * @param {object[]} contactsWithIndexes - Contacts with indexes
 * @param {object[]} contactsWithNoIndexes - Contacts without indexes
 * @returns {object[]} Sorted and harmonized contacts
 */
export const reworkContacts = (
  hasServiceBeenLaunched,
  contactsWithIndexes,
  contactsWithNoIndexes
) => {
  const reworkedContacts = hasServiceBeenLaunched
    ? moveMyselfAndFavoritesToFirstPosition(
        contactsWithIndexes.concat(contactsWithNoIndexes)
      )
    : moveMyselfAndFavoritesToFirstPosition(
        harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl(
          contactsWithIndexes,
          contactsWithNoIndexes
        )
      )

  return reworkedContacts
}

/**
 * Add a group to a contact
 * @param {object} contact - An io.cozy.contact document
 * @param {object} group - An io.cozy.contacts.groups document
 */
export const addGroupToContact = (contact, group) =>
  HasMany.setHasManyItem(contact, 'groups', group._id, group)

export const makeContactWithIdentitiesAddresses = (contact, identities) => {
  if (!identities || !contact.me || contact.address?.length > 0) return contact

  return {
    ...contact,
    address: identities[0]?.contact?.address || contact?.address || []
  }
}
