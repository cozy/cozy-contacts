import sortBy from 'lodash/sortBy'
import { models, HasMany } from 'cozy-client'

const {
  getFullname,
  getIndexByFamilyNameGivenNameEmailCozyUrl,
  getDisplayName
} = models.contact

export const supportedFieldsInOrder = [
  'phone',
  'email',
  'address',
  'cozy',
  'company',
  'jobTitle',
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
        'accounts',
        'me',
        'displayName',
        'indexes'
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

export const getConnectedAccounts = contact =>
  contact.accounts.data.filter(account => account.sourceAccount !== null)

export const normalizeFields = contact => {
  const fields = getFieldListFrom(contact)
  const filteredFields = filterFieldList(fields)
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
    fullname: getFullname(contact),
    displayName: getDisplayName(contact),
    indexes: {
      byFamilyNameGivenNameEmailCozyUrl: getIndexByFamilyNameGivenNameEmailCozyUrl(
        contact
      )
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
 * Sort and rework contacts according to 'keepIndexFullNameAndDisplayNameUpToDate' service status
 * @param {bool} hasServiceBeenLaunched - 'keepIndexFullNameAndDisplayNameUpToDate' service launch status
 * @param {array} contactsWithIndexes - Contacts with indexes
 * @param {array} contactsWithNoIndexes - Contacts without indexes
 * @returns {array} Sorted and harmonized contacts
 */
export const reworkContacts = (
  hasServiceBeenLaunched,
  contactsWithIndexes,
  contactsWithNoIndexes
) => {
  const reworkedContacts = hasServiceBeenLaunched
    ? contactsWithIndexes.concat(contactsWithNoIndexes)
    : harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl(
        contactsWithIndexes,
        contactsWithNoIndexes
      )
  return reworkedContacts
}

/**
 * Returns the contact's formatted address
 * @param {object} address - A contact address
 * @param {function} t - Translate function
 * @returns {string} - The contact's formatted address
 */
export const getFormattedAddress = (address, t) => {
  if (address.formattedAddress) {
    return address.formattedAddress
  } else {
    const emptyAddress = {
      street: '',
      pobox: '',
      city: '',
      region: '',
      postcode: '',
      country: ''
    }
    return t('formatted.address', { ...emptyAddress, ...address }).trim()
  }
}

/**
 * Add a group to a contact
 * @param {object} contact - An io.cozy.contact document
 * @param {object} group - An io.cozy.contacts.groups document
 */
export const addGroupToContact = (contact, group) =>
  HasMany.setHasManyItem(contact, 'groups', group._id, group)
