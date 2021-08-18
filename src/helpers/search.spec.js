import { johnDoeContact } from './testData'

import { filterContactsByLetter } from './search'

describe('filterContactsByLetter', () => {
  const contacts = [johnDoeContact]

  it('should return john doe when filtering by J', () => {
    // When
    const filterContacts = filterContactsByLetter(contacts, 'J')

    // Then
    expect(filterContacts).toHaveLength(1)
    expect(filterContacts).toEqual(1)
  })

  it('should return john doe when filtering by N', () => {
    // When
    const filterContacts = filterContactsByLetter(contacts, 'N')

    // Then
    expect(filterContacts).toHaveLength(0)
  })
})
