import { dummyJohnDoeContact } from './testData'

import { filterContactsByLetter } from './search'

describe('filterContactsByLetter', () => {
  const contacts = [
    dummyJohnDoeContact({ displayName: 'John Doe' }),
    dummyJohnDoeContact({ displayName: 'Johnny Cash' }),
    dummyJohnDoeContact({ displayName: 'Johnny Halliday' }),
    dummyJohnDoeContact({ displayName: 'Jéro Nimo' }),
    dummyJohnDoeContact({ displayName: 'Another Contact' })
  ]

  it('should return john doe when filtering by J', () => {
    // When
    const filterContacts = filterContactsByLetter(contacts, 'J')

    // Then
    expect(filterContacts).toHaveLength(4)
    expect(filterContacts).toEqual([
      dummyJohnDoeContact({ displayName: 'John Doe' }),
      dummyJohnDoeContact({ displayName: 'Johnny Cash' }),
      dummyJohnDoeContact({ displayName: 'Johnny Halliday' }),
      dummyJohnDoeContact({ displayName: 'Jéro Nimo' })
    ])
  })

  it('should return john doe when filtering by N', () => {
    // When
    const filterContacts = filterContactsByLetter(contacts, 'N')

    // Then
    expect(filterContacts).toHaveLength(0)
  })
})
