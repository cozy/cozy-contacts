import ContactsList from './ContactsList'
import { get } from 'lodash'

export function buildLastNameFirst(contact) {
  const givenNameA = get(contact, 'name.givenName', '')
  const familyNameA = get(contact, 'name.familyName', '')

  return `${familyNameA} ${givenNameA}`.toUpperCase().trim()
}

export const sortLastNameFirst = (contact, comparedContact) => {
  const nameA = buildLastNameFirst(contact)
  const nameB = buildLastNameFirst(comparedContact)

  return nameA.localeCompare(nameB)
}

export function getLastNameFirstLetterWithoutAccent(contact) {
  const firstLetter = buildLastNameFirst(contact)[0] || ''

  return firstLetter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default ContactsList
