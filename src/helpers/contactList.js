import { get } from 'lodash'

/**
 * Categorize contacts by first letter of their indexes.byFamilyNameGivenNameEmailCozyUrl
 * Expl.: all contacts with A as first letter will be in A category
 * @param {array} contacts - array of io.cozy.contact documents
 * @param {string} emptyHeader - header for contacts with no indexes.byFamilyNameGivenNameEmailCozyUrl
 * @returns {object} categorized contacts
 */
export const categorizeContacts = (contacts, emptyHeader) => {
  return contacts.reduce((acc, contact) => {
    const index = get(contact, 'indexes.byFamilyNameGivenNameEmailCozyUrl', '')
    const header = index[0] || emptyHeader
    acc[header] = acc[header] || []
    acc[header].push(contact)
    return acc
  }, {})
}

/**
 * Filter contacts by first letter of their name.familyName
 * Expl.: given 'A' character in input, only contacts with family name starting with 'A' will be returned
 * @param {array} contacts - array of io.cozy.contact documents
 * @param {string} firstLetter - character used to filter contacts; it will be first letter of every contact family name in returned array
 * @returns {array} filtered contacts
 */
export const filterContacts = (contacts, firstLetter) => {
  if (!firstLetter) {
    return contacts
  }

  const uppercaseFirstLetter = firstLetter.toUpperCase()

  return contacts.filter(contact => {
    const familyName = get(contact, 'name.familyName', null)
    return (
      familyName && familyName.charAt(0).toUpperCase() === uppercaseFirstLetter
    )
  })
}
