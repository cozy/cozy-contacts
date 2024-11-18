import sortBy from 'lodash/sortBy'

import { models, HasMany } from 'cozy-client'
import { getHasManyItem } from 'cozy-client/dist/associations/HasMany'

const { makeFullname, makeDefaultSortIndexValue, makeDisplayName } =
  models.contact

export const supportedFieldsInOrder = [
  'phone',
  'email',
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
 * Update fullname, displayName and Index values of a contact
 * @param {object} contact - an io.cozy.contact document
 * @returns {object} an io.cozy.contact document
 */
export const updateIndexFullNameAndDisplayName = contact => {
  return {
    ...contact,
    fullname: makeFullname(contact),
    displayName: makeDisplayName(contact),
    indexes: {
      byFamilyNameGivenNameEmailCozyUrl: makeDefaultSortIndexValue(contact)
    }
  }
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

const cleanFormattedAddress = formattedAddress => {
  // Replace all spaces by one space, to fix cases where there are multiple spaces
  // Replace commas that have a space before
  // And remove all spaces before & after the string
  let formattedAddressClean = formattedAddress
    .replace(/\s+/g, ' ')
    .replace(/\s,/g, '')
    .trim()

  // Case where a comma is the last character
  if (
    formattedAddressClean.lastIndexOf(',') ===
    formattedAddressClean.length - 1
  ) {
    formattedAddressClean = formattedAddressClean.slice(
      0,
      formattedAddressClean.length - 1
    )
  }

  // Case where a comma is the first character
  if (formattedAddressClean.indexOf(',') === 0) {
    formattedAddressClean = formattedAddressClean.slice(1)
  }

  return formattedAddressClean
}

/**
 * Returns the contact's formatted address
 * @param {object} address - A contact address
 * @param {function} t - Translate function
 * @returns {string} - The contact's formatted address
 */
export const getFormattedAddress = (address, t) => {
  if (address && address.formattedAddress) {
    return address.formattedAddress
  }

  const unformattedAddress = {
    number: address.number || '',
    street: address.street || '',
    code: address.postcode || '',
    city: address.city || '',
    region: address.region || '',
    country: address.country || ''
  }

  return cleanFormattedAddress(t('formatted.address', unformattedAddress))
}

/**
 * Add a group to a contact
 * @param {object} contact - An io.cozy.contact document
 * @param {object} group - An io.cozy.contacts.groups document
 */
export const addGroupToContact = (contact, group) =>
  HasMany.setHasManyItem(contact, 'groups', group._id, group)

/**
 * Make formatted address
 * @param {{ name: string, value: string }[]} subFieldsState - State of address sub fields
 * @returns {string} - Formatted address
 */
export const makeFormattedAddressWithSubFields = (subFieldsState, t) => {
  const normalizedAddress = subFieldsState.reduce((acc, curr) => {
    const key = curr.name
      .split('.')
      .pop()
      .replace(/address/, '')

    return {
      ...acc,
      [key]: curr.value || ''
    }
  }, {})

  return cleanFormattedAddress(t('formatted.address', normalizedAddress))
}

export const makeContactWithIdentitiesAddresses = (contact, identities) => {
  if (!identities || !contact.me || contact.address?.length > 0) return contact

  return {
    ...contact,
    address: identities[0]?.contact?.address || contact?.address || []
  }
}
