import {
  getFieldListFrom,
  filterFieldList,
  groupUnsupportedFields,
  supportedFieldsInOrder,
  orderFieldList,
  makeValuesArray
} from './contacts'
import { DOCTYPE_CONTACTS } from './doctypes'

const _Date = Date

beforeAll(() => {
  const DATE_TO_USE = new Date('2018-01-01T12:00:00.210Z')
  const MockDate = (...args) => {
    if (args.length === 0) {
      return DATE_TO_USE
    } else {
      return new _Date(...args)
    }
  }
  MockDate.toISOString = _Date.toISOString
  MockDate.prototype = _Date.prototype
  global.Date = MockDate
})

afterAll(() => {
  jest.restoreAllMocks()
  global.Date = _Date
})

describe('Manage Contacts fields', () => {
  test('full transformation', () => {
    const contact = {
      _id: 'c6899688-6cc6-4ffb-82d4-ab9f9b82c582',
      id: 'c6899688-6cc6-4ffb-82d4-ab9f9b82c582',
      _rev: '1-9368a4f2e467c449f4a1f5171a784aa8',
      _type: DOCTYPE_CONTACTS,
      metadata: {
        version: 1
      },
      groups: ['abc', 'def'],
      address: [
        {
          city: 'Stafford',
          country: 'Solomon Islands',
          postcode: '06635',
          primary: true,
          street: '48 Fuller Road'
        }
      ],
      birthday: '1998-06-03',
      email: [
        { address: 'rikki.white@celmax.name', primary: true },
        { address: 'eleanore.fennell@thermolock.name', primary: false }
      ],
      name: { familyName: 'White', givenName: 'Rikki' },
      fullname: 'Rikki White',
      phone: [
        { number: '+33 (1)9 14 02 28 31', primary: true },
        { number: '+33 (2)3 99 53 65 21', primary: false }
      ],
      unknownField: 'unknownField',
      emptyField: ''
    }
    const expectedContact = [
      {
        type: 'phone',
        values: [
          { number: '+33 (1)9 14 02 28 31', primary: true },
          { number: '+33 (2)3 99 53 65 21', primary: false }
        ]
      },
      {
        type: 'email',
        values: [
          { address: 'rikki.white@celmax.name', primary: true },
          { address: 'eleanore.fennell@thermolock.name', primary: false }
        ]
      },
      {
        type: 'address',
        values: [
          {
            city: 'Stafford',
            country: 'Solomon Islands',
            postcode: '06635',
            primary: true,
            street: '48 Fuller Road'
          }
        ]
      },
      { type: 'birthday', values: ['1998-06-03'] },
      { type: 'other', values: ['unknownField'] }
    ]
    const immutableContact = { ...contact }

    const normalizedFields = makeValuesArray(
      orderFieldList(
        groupUnsupportedFields(
          filterFieldList(getFieldListFrom(contact)),
          supportedFieldsInOrder
        ),
        supportedFieldsInOrder
      )
    )

    expect(contact).toEqual(immutableContact)
    expect(normalizedFields).toEqual(expectedContact)
  })
})
