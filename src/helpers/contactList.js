import get from 'lodash/get'
import removeAccents from 'remove-accents'

const makeHeader = (contact, t) => {
  if (contact.me) return t('me')

  const index = get(contact, 'indexes.byFamilyNameGivenNameEmailCozyUrl', '')
  const hasIndex = index !== null && index.length > 0
  return (hasIndex && removeAccents(index[0])) || t('empty-list')
}

/**
 * Categorize contacts by first letter of their indexes.byFamilyNameGivenNameEmailCozyUrl
 * Expl.: all contacts with A as first letter will be in A category
 * @param {array} contacts - Array of io.cozy.contact documents
 * @param {Function} t - Translation function
 * @returns {object} Categorized contacts
 */
export const categorizeContacts = (contacts, t) => {
  return contacts.reduce((acc, contact) => {
    const header = makeHeader(contact, t)
    acc[header] = acc[header] || []
    acc[header].push(contact)
    return acc
  }, {})
}
