import { categorizeContacts } from './contactList'

describe('Categorize contacts', () => {
  it('should categorize contacts by indexes.byFamilyNameGivenNameEmailCozyUrl', () => {
    const contacts = [
      { name: 'Alex', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
      { name: 'Alan', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
      { name: 'Cleo', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
      { name: 'Bernard', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' } },
      { name: 'Xavier', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'X' } },
      { name: 'Zorro', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Z' } },
      { name: '', indexes: { byFamilyNameGivenNameEmailCozyUrl: '' } },
      { name: {}, indexes: { byFamilyNameGivenNameEmailCozyUrl: {} } }
    ]
    const categorizedContacts = categorizeContacts(contacts, 'EMPTY')
    expect(categorizedContacts).toEqual({
      A: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alex' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alan' }
      ],
      B: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' }, name: 'Bernard' }
      ],
      C: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }, name: 'Cleo' }
      ],
      EMPTY: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: '' }, name: '' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: {} }, name: {} }
      ],
      X: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'X' }, name: 'Xavier' }
      ],
      Z: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Z' }, name: 'Zorro' }
      ]
    })
  })
})
