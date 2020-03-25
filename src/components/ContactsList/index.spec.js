import { sortLastNameFirst, getLastNameFirstLetterWithoutAccent } from './'

describe('Sort contacts', () => {
  describe('By Last Name', () => {
    test.only('should sort contact by last name', () => {
      const contacts = [
        { name: { givenName: '', familyName: '' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { givenName: 'A', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'C' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: '', familyName: 'A' } }
      ]
      const sortedContact = [...contacts].sort(sortLastNameFirst)
      expect(sortedContact).toEqual([
        { name: { familyName: '', givenName: '' } },
        { name: { familyName: 'A', givenName: '' } },
        { name: { familyName: '', givenName: 'A' } },
        { name: { familyName: 'A', givenName: 'A' } },
        { name: { familyName: 'A', givenName: 'B' } },
        { name: { familyName: 'B', givenName: '' } },
        { name: { familyName: '', givenName: 'B' } },
        { name: { familyName: 'B', givenName: 'A' } },
        { name: { familyName: 'B', givenName: 'B' } },
        { name: { familyName: 'B', givenName: 'C' } },
        { name: { familyName: 'C', givenName: 'A' } },
        { name: { familyName: 'C', givenName: 'B' } }
      ])
    })
    test('should work with incomplete data', () => {
      const contacts = [
        { name: { givenName: '' } },
        { name: { givenName: 'A' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { familyName: 'B' } },
        { name: { familyName: 'C' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'C' } },
        { name: { givenName: '', familyName: 'A' } },
        { name: { givenName: '', familyName: 'B' } }
      ]
      const sortedContact = [...contacts].sort(sortLastNameFirst)
      expect(sortedContact).toEqual([
        { name: { givenName: '' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'A' } },
        { name: { givenName: '', familyName: 'A' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { familyName: 'B' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { familyName: 'C' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'B', familyName: 'C' } }
      ])
    })
  })
})

describe('getLastNameFirstLetterWithoutAccent', () => {
  test('should remove accent', () => {
    const contact = { name: { givenName: 'à', familyName: 'à' } }

    const character = getLastNameFirstLetterWithoutAccent(contact)

    expect(character).toBe('A')
  })
})
