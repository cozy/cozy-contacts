import ContactsList from './ContactsList'

export function buildLastNameFirst(contact) {
  const givenNameA =
    contact.name && contact.name.givenName
      ? contact.name.givenName.toUpperCase()
      : ''
  const familyNameA =
    contact.name && contact.name.familyName
      ? contact.name.familyName.toUpperCase()
      : ''
  const nameA = `${familyNameA} ${givenNameA}`.trim()
  return nameA
}

export const sortLastNameFirst = (contact, comparedContact) => {
  const nameA = buildLastNameFirst(contact)
  const nameB = buildLastNameFirst(comparedContact)
  return nameA.localeCompare(nameB)
}

export const sortContactsBy = (contacts, filter) => {
  return [...contacts].reduce((acc, contact) => {
    const { groups = { data: [] } } = contact.relationships
    const isInGroup =
      groups.data.find(group => group['_id'] === filter) !== undefined
    isInGroup && acc.push(contact)
    return acc
  }, [])
}

export default ContactsList
