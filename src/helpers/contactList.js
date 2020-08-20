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
