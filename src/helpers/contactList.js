import get from 'lodash/get'
import removeAccents from 'remove-accents'

const makeHeader = (contact, t) => {
  if (contact.me) return t('me')
  if (contact.cozyMetadata?.favorite) return t('favorite')

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

/**
 * Counts how many contacts are categorized by first letter and store it in `groupCounts`
 * Expl.: if there is 3 contacts in A and 2 in B, it will return [3,2]
 * Also store first letters and store them in `groupLabels`
 * @param {array} contacts - Array of io.cozy.contact documents
 * @returns {object}
 */
export const makeGroupLabelsAndCounts = (contacts, t) => {
  return contacts.reduce(
    (acc, contact) => {
      const header = makeHeader(contact, t)
      if (!acc.groupLabels.includes(header)) {
        acc.groupLabels.push(header)
      }
      const idx = acc.groupLabels.indexOf(header)
      const val = acc.groupCounts[idx] || 0
      acc.groupCounts[idx] = val + 1
      return acc
    },
    { groupLabels: [], groupCounts: [] }
  )
}
