import MockDate from 'mockdate'

import {
  getConnectedAccounts,
  normalizeFields,
  harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl,
  reworkContacts,
  makeContactWithIdentitiesAddresses
} from './contacts'
import {
  johnDoeContact,
  johnDoeContactWithRelated
} from '../components/AddModal/mocks'

const MOCKED_DATE = '2018-01-01T12:00:00.210Z'

beforeAll(() => {
  MockDate.set(MOCKED_DATE)
})

afterAll(() => {
  jest.restoreAllMocks()
  MockDate.reset()
})

describe('getConnectedAccounts', () => {
  it('should work for a contact with at least one account', () => {
    const contact = {
      _id: '123',
      accounts: {
        data: [
          {
            _type: 'io.cozy.contacts.accounts',
            _id: 'abc',
            sourceAccount: '3290840'
          },
          {
            _type: 'io.cozy.contacts.accounts',
            _id: 'def',
            sourceAccount: null
          }
        ]
      }
    }
    const expected = [
      {
        _type: 'io.cozy.contacts.accounts',
        _id: 'abc',
        sourceAccount: '3290840'
      }
    ]
    expect(getConnectedAccounts(contact)).toEqual(expected)
  })

  it('should work for a contact with disconnected accounts', () => {
    const contact = {
      _id: '123',
      accounts: {
        data: [
          {
            _type: 'io.cozy.contacts.accounts',
            _id: 'abc',
            sourceAccount: null
          }
        ]
      }
    }
    expect(getConnectedAccounts(contact).length).toBe(0)
  })

  it('should work for a contact without accounts', () => {
    const contact = {
      _id: '123',
      accounts: {
        data: []
      }
    }
    expect(getConnectedAccounts(contact).length).toBe(0)
  })
})

describe('normalizeFields', () => {
  it('should create an array [{type: string, values: arrayOfObject}] from contact attributes', () => {
    const expected = [
      {
        type: 'phone',
        values: [
          { number: '+33 (2)0 90 00 54 04', primary: true },
          { number: '+33 6 77 11 22 33', primary: false }
        ]
      },
      {
        type: 'email',
        values: [
          { address: 'john.doe@posteo.net', primary: false, type: 'personal' },
          { address: 'john.doe@cozycloud.cc', primary: true }
        ]
      },
      {
        type: 'address',
        values: [
          {
            formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
            primary: true,
            type: 'Home'
          },
          {
            city: 'Port Easter',
            country: 'Cocos (Keeling) Islands',
            pobox: '2',
            postcode: '84573',
            street: '426 Runolfsson Knolls',
            type: 'Work'
          }
        ]
      },
      {
        type: 'cozy',
        values: [
          {
            type: 'MyCozy',
            primary: true,
            url: 'https://johndoe.mycozy.cloud'
          }
        ]
      },
      { type: 'company', values: ['Cozy cloud'] },
      { type: 'jobTitle', values: ['Dreamer'] },
      { type: 'birthday', values: ['1999-5-1'] },
      {
        type: 'relationship',
        values: [
          {
            name: 'Alice Doe',
            label: 'spouse',
            id: '5b49553c5916cf7b5b2a5f48600078a8'
          }
        ]
      },
      {
        type: 'note',
        values: [
          'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.'
        ]
      },
      { type: 'other', values: [] }
    ]

    expect(normalizeFields(johnDoeContactWithRelated)).toEqual(expected)
  })
})

describe('harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl', () => {
  it('should returns contacts with indexes and sorted by indexes.byFamilyNameGivenNameEmailCozyUrl & mySelf first', () => {
    const contactsWithIndexes = [
      {
        name: {
          givenName: 'Matt',
          familyName: 'Damon'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'damonmatt'
        }
      },
      {
        name: {
          givenName: 'John',
          familyName: 'Doe'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'doejohn'
        }
      },
      {
        name: {
          givenName: 'Max',
          familyName: 'Abe'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'abemax'
        },
        me: true
      }
    ]

    const contactsWithNoIndexes = [
      {
        name: {
          givenName: 'Anton',
          familyName: 'Bradbury'
        }
      },
      {
        name: {
          givenName: 'William',
          familyName: 'Wallace'
        }
      }
    ]

    const expected = [
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'abemax' },
        me: true,
        name: { familyName: 'Abe', givenName: 'Max' }
      },
      {
        displayName: 'Anton Bradbury',
        fullname: 'Anton Bradbury',
        name: { familyName: 'Bradbury', givenName: 'Anton' },
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'bradburyanton' }
      },
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'damonmatt' },
        name: { familyName: 'Damon', givenName: 'Matt' }
      },
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'doejohn' },
        name: { familyName: 'Doe', givenName: 'John' }
      },
      {
        displayName: 'William Wallace',
        fullname: 'William Wallace',
        name: { familyName: 'Wallace', givenName: 'William' },
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'wallacewilliam' }
      }
    ]

    expect(
      harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl(
        contactsWithIndexes,
        contactsWithNoIndexes
      )
    ).toEqual(expected)
  })
})

describe('reworkContacts', () => {
  it('should returns sorted contacts, and contacts without indexes should be harmonized', () => {
    const hasServiceBeenLaunched = false
    const contactsWithIndexes = [
      {
        name: {
          givenName: 'Matt',
          familyName: 'Damon'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'mattdamon'
        }
      },
      {
        name: {
          givenName: 'Max',
          familyName: 'Abe'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'maxabe'
        },
        me: true
      }
    ]

    const contactsWithNoIndexes = [
      {
        name: {
          givenName: 'Anton',
          familyName: 'Bradbury'
        }
      }
    ]

    const expected = [
      {
        name: {
          givenName: 'Max',
          familyName: 'Abe'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'maxabe'
        },
        me: true
      },
      {
        displayName: 'Anton Bradbury',
        fullname: 'Anton Bradbury',
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'bradburyanton' },
        name: { familyName: 'Bradbury', givenName: 'Anton' }
      },
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'mattdamon' },
        name: { familyName: 'Damon', givenName: 'Matt' }
      }
    ]

    expect(
      reworkContacts(
        hasServiceBeenLaunched,
        contactsWithIndexes,
        contactsWithNoIndexes
      )
    ).toEqual(expected)
  })

  it('should returns sorted contacts with no transformation on contacts without indexes', () => {
    const hasServiceBeenLaunched = true
    const contactsWithIndexes = [
      {
        name: {
          givenName: 'Matt',
          familyName: 'Damon'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'mattdamon'
        }
      },
      {
        name: {
          givenName: 'Max',
          familyName: 'Abe'
        },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'maxabe'
        },
        me: true
      }
    ]

    const contactsWithNoIndexes = [
      {
        name: {
          givenName: 'Anton',
          familyName: 'Bradbury'
        }
      }
    ]

    const expected = [
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'maxabe' },
        me: true,
        name: { familyName: 'Abe', givenName: 'Max' }
      },
      {
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'mattdamon' },
        name: { familyName: 'Damon', givenName: 'Matt' }
      },
      { name: { familyName: 'Bradbury', givenName: 'Anton' } }
    ]

    expect(
      reworkContacts(
        hasServiceBeenLaunched,
        contactsWithIndexes,
        contactsWithNoIndexes
      )
    ).toEqual(expected)
  })
})

describe('makeContactWithIdentitiesAddresses', () => {
  it('should return the same contact if it has at least one address', () => {
    const contactMock = {
      ...johnDoeContact,
      me: true,
      address: [
        {
          formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
          postcode: '05034',
          city: 'Singapore'
        }
      ]
    }
    const identitiesMock = [
      { contact: { address: [{ city: 'Cambridge', postcode: '16862' }] } }
    ]
    const res = makeContactWithIdentitiesAddresses(contactMock, identitiesMock)

    expect(res).toBe(contactMock)
  })

  it('should return the same contact if `identitites` param is falsy', () => {
    const contactMock = {
      ...johnDoeContact,
      me: true,
      address: [
        {
          formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
          postcode: '05034',
          city: 'Singapore'
        }
      ]
    }
    const identitiesMock = undefined
    const res = makeContactWithIdentitiesAddresses(contactMock, identitiesMock)

    expect(res).toBe(contactMock)
  })

  it('should return the contact with the addresses in "identities" if it does not have one itself', () => {
    const contactMock = {
      ...johnDoeContact,
      me: true,
      address: []
    }
    const identitiesMock = [
      { contact: { address: [{ city: 'Cambridge', postcode: '16862' }] } }
    ]

    const expected = {
      ...johnDoeContact,
      me: true,
      address: [{ city: 'Cambridge', postcode: '16862' }]
    }

    const res = makeContactWithIdentitiesAddresses(contactMock, identitiesMock)

    expect(res).toStrictEqual(expected)
  })

  it('should return the same contact if has no addresses and the "me" attribut is falsy', () => {
    const contactMock = {
      ...johnDoeContact,
      me: false,
      address: []
    }
    const identitiesMock = [
      { contact: { address: [{ city: 'Cambridge', postcode: '16862' }] } }
    ]

    const res = makeContactWithIdentitiesAddresses(contactMock, identitiesMock)

    expect(res).toStrictEqual(contactMock)
  })

  it('should return the same contact if it has at least one address and the "me" attribut is falsy', () => {
    const contactMock = {
      ...johnDoeContact,
      me: false,
      address: [
        {
          formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
          postcode: '05034',
          city: 'Singapore'
        }
      ]
    }
    const identitiesMock = [
      { contact: { address: [{ city: 'Cambridge', postcode: '16862' }] } }
    ]

    const res = makeContactWithIdentitiesAddresses(contactMock, identitiesMock)

    expect(res).toStrictEqual(contactMock)
  })
})
