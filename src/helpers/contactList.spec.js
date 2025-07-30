import { categorizeContacts, makeGroupLabelsAndCounts } from './contactList'

const t = x => x
const contacts = [
  { name: 'Alex', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
  { name: 'Alan', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' } },
  { name: 'Cleo', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
  { name: 'Cloé', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
  { name: 'Clotilde', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
  { name: 'Constant', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
  { name: 'Christophe', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' } },
  { name: 'Bernard', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' } },
  { name: 'Baptiste', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' } },
  { name: 'Xavier', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'X' } },
  { name: 'Zorro', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Z' } },
  { name: '', indexes: { byFamilyNameGivenNameEmailCozyUrl: '' } },
  { name: {}, indexes: { byFamilyNameGivenNameEmailCozyUrl: {} } },
  { name: 'John', indexes: { byFamilyNameGivenNameEmailCozyUrl: null } },
  { name: 'Connor', indexes: { byFamilyNameGivenNameEmailCozyUrl: undefined } },
  { name: 'Àlbert', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'À' } },
  {
    name: 'Alice',
    me: true,
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Alice' }
  },
  { name: 'Èllen', indexes: { byFamilyNameGivenNameEmailCozyUrl: 'È' } }
]
const categorizedContacts = categorizeContacts(contacts, t)

describe('categorizeContacts', () => {
  it('should categorize contacts by indexes.byFamilyNameGivenNameEmailCozyUrl', () => {
    expect(categorizedContacts).toStrictEqual({
      me: [
        {
          name: 'Alice',
          me: true,
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Alice' }
        }
      ],
      A: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alex' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }, name: 'Alan' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'À' }, name: 'Àlbert' }
      ],
      B: [
        {
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' },
          name: 'Bernard'
        },
        {
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' },
          name: 'Baptiste'
        }
      ],
      C: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }, name: 'Cleo' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }, name: 'Cloé' },
        {
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' },
          name: 'Clotilde'
        },
        {
          name: 'Constant',
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }
        },
        {
          name: 'Christophe',
          indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }
        }
      ],
      E: [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: 'È' }, name: 'Èllen' }
      ],
      'empty-list': [
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: '' }, name: '' },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: {} }, name: {} },
        { indexes: { byFamilyNameGivenNameEmailCozyUrl: null }, name: 'John' },
        {
          name: 'Connor',
          indexes: { byFamilyNameGivenNameEmailCozyUrl: undefined }
        }
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

describe('makeGroupLabelsAndCounts', () => {
  it('should returns labels and counts', () => {
    const res = makeGroupLabelsAndCounts(contacts, t)

    expect(res).toStrictEqual({
      groupLabels: ['A', 'C', 'B', 'X', 'Z', 'empty-list', 'me', 'E'],
      groupCounts: [3, 5, 2, 1, 1, 4, 1, 1]
    })
  })
})
