import MockDate from 'mockdate'
import {
  getConnectedAccounts,
  normalizeFields,
  updateIndexFullNameAndDisplayName
} from './contacts'
import { johnDoeContact } from './testData'

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
            label: 'MyCozy',
            primary: true,
            url: 'https://johndoe.mycozy.cloud'
          }
        ]
      },
      { type: 'company', values: ['Cozy cloud'] },
      { type: 'jobTitle', values: ['Dreamer'] },
      { type: 'birthday', values: ['1999-5-1'] },
      {
        type: 'note',
        values: [
          'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.'
        ]
      },
      { type: 'other', values: [] }
    ]

    expect(normalizeFields(johnDoeContact)).toEqual(expected)
  })
})

describe('updateIndexFullNameAndDisplayName', () => {
  it('should returns a contact with new attributes', () => {
    const expected = {
      ...johnDoeContact,
      displayName: 'John Doe',
      fullname: 'John Doe',
      indexes: {
        byFamilyNameGivenNameEmailCozyUrl:
          'Doejohnjohn.doe@cozycloud.ccjohndoe.mycozy.cloud'
      }
    }
    expect(updateIndexFullNameAndDisplayName(johnDoeContact)).toEqual(expected)
  })
})
