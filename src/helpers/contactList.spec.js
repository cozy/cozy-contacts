import { categorizeContacts } from './contactList'

describe('categorizeContacts', () => {
  const t = jest.fn(() => 'EMPTY')
  it('should categorize contacts by indexes.byFamilyNameGivenNameEmailCozyUrl', () => {
    const contacts = [
      { name: 'Alex', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
      { name: 'Alan', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
      { name: 'Cleo', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
      { name: 'Bernard', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' } },
      { name: 'Xavier', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'X' } },
      { name: 'Zorro', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Z' } },
      { name: '', indexes: { byFamilyNameGivenNameEmailCozyUrl: '' } },
      { name: {}, indexes: { byFamilyNameGivenNameEmailCozyUrl: {} } },
      { name: 'John', indexes: { byFamilyNameGivenNameEmailCozyUrl: null } },
      { name: 'Àlbert', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'À' } },
      { name: 'Èllen', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'È' } }
    ]
    const categorizedContacts = categorizeContacts(contacts, t)
    expect(categorizedContacts).toEqual({
      A: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alex' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alan' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'À' }, name: 'Àlbert' }
      ],
      B: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' }, name: 'Bernard' }
      ],
      C: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }, name: 'Cleo' }
      ],
      E: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'È' }, name: 'Èllen' }
      ],
      EMPTY: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: '' }, name: '' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: {} }, name: {} },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: null }, name: 'John' }
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
