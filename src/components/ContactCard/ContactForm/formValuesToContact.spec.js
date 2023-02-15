import Polyglot from 'node-polyglot'

import formValuesToContact from './formValuesToContact'
import { updateIndexFullNameAndDisplayName } from '../../../helpers/contacts'
import { johnDoeFormValues, johnDoeContact } from '../../../helpers/testData'
import en from '../../../locales/en.json'

const polyglot = new Polyglot()
polyglot.extend(en)
const t = polyglot.t.bind(polyglot)

describe('formValuesToContact', () => {
  it('should convert form values to contact when creating a contact', () => {
    const expected = {
      address: [
        {
          formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
          primary: true,
          type: 'Home'
        },
        {
          formattedAddress:
            '426 Runolfsson Knolls 84573 Port Easter Cocos (Keeling) Islands',
          primary: false,
          type: 'Work'
        }
      ],
      birthday: '1999-5-1',
      gender: 'male',
      company: 'Cozy cloud',
      cozy: [
        { label: 'MyCozy', primary: true, url: 'https://johndoe.mycozy.cloud' }
      ],
      displayName: 'John Doe',
      email: [
        { address: 'john.doe@cozycloud.cc', primary: true, type: undefined },
        { address: 'john.doe@posteo.net', primary: false, type: 'personal' }
      ],
      fullname: 'John Doe',
      indexes: {
        byFamilyNameGivenNameEmailCozyUrl:
          'doejohnjohn.doe@cozycloud.ccjohndoe.mycozy.cloud'
      },
      jobTitle: 'Dreamer',
      metadata: { cozy: true, version: 1 },
      name: { familyName: 'Doe', givenName: 'John' },
      note: 'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
      phone: [
        { number: '+33 (2)0 90 00 54 04', primary: true, type: undefined },
        { number: '+33 6 77 11 22 33', primary: false, type: undefined }
      ],
      relationships: {
        groups: {
          data: []
        }
      }
    }

    const result = formValuesToContact({
      formValues: johnDoeFormValues,
      oldContact: null,
      t
    })
    expect(result).toEqual(expected)
  })

  it('should convert form values that have been cleared to contact', () => {
    const formValues = {
      address: [
        {
          formattedAddress: undefined,
          primary: true,
          type: undefined
        }
      ],
      birthday: undefined,
      gender: 'female',
      company: undefined,
      jobTitle: undefined,
      cozy: undefined,
      cozyLabel: undefined,
      email: [
        {
          email: undefined,
          emailLabel: undefined
        }
      ],
      familyName: 'Doe',
      givenName: 'Jane',
      note: undefined,
      phone: [
        {
          number: undefined,
          primary: true,
          type: undefined
        }
      ]
    }

    const expected = {
      address: [],
      birthday: '',
      gender: 'female',
      company: '',
      cozy: [],
      displayName: 'Jane Doe',
      email: [],
      fullname: 'Jane Doe',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'doejane' },
      jobTitle: '',
      metadata: { cozy: true, version: 1 },
      name: { familyName: 'Doe', givenName: 'Jane' },
      note: '',
      phone: [],
      relationships: { groups: { data: [] } }
    }

    const result = formValuesToContact({ formValues, oldContact: null, t })
    expect(result).toEqual(expected)
  })

  it('should not erase metadata.google if it was present in the contact', () => {
    const oldContact = {
      metadata: {
        google: {
          metadata: {
            sources: [
              {
                etag: 'bb0d4f0c-ac79-4519-8873-e0445b378fd7'
              }
            ]
          }
        }
      }
    }

    const expectedMetadata = {
      cozy: true,
      google: {
        metadata: {
          sources: [
            {
              etag: 'bb0d4f0c-ac79-4519-8873-e0445b378fd7'
            }
          ]
        }
      },
      version: 1
    }

    const result = formValuesToContact({
      formValues: johnDoeFormValues,
      oldContact,
      t
    })
    expect(result.metadata).toEqual(expectedMetadata)
  })

  it('should not remove additional data if it was present in the contact', () => {
    const oldContact = {
      name: {
        additionalName: 'J.',
        familyName: 'House',
        givenName: 'Gregory',
        namePrefix: 'Dr.',
        nameSuffix: 'III'
      },
      me: true
    }

    const expected = {
      name: {
        additionalName: 'J.',
        familyName: 'Doe',
        givenName: 'John',
        namePrefix: 'Dr.',
        nameSuffix: 'III'
      },
      me: true
    }

    const result = formValuesToContact({
      formValues: johnDoeFormValues,
      oldContact,
      t
    })
    Object.keys(oldContact).map(key =>
      expect(result[key]).toEqual(expected[key])
    )
  })

  it('should not remove attributes not in the doctype if it was present in the contact', () => {
    const oldContact = {
      otherInfoNotInDoctype: {
        information: 'Lorem Ipsum'
      }
    }
    const expected = { information: 'Lorem Ipsum' }

    const result = formValuesToContact({
      formValues: johnDoeFormValues,
      oldContact,
      t
    })
    expect(result.otherInfoNotInDoctype).toEqual(expected)
  })

  it('should erase contact datas for empty fields', () => {
    const formValues = {
      gender: undefined,
      givenName: undefined,
      familyName: undefined,
      company: undefined,
      jobTitle: undefined,
      birthday: undefined,
      note: undefined,
      address: [undefined],
      email: [undefined],
      phone: [undefined],
      cozy: undefined
    }

    const expected = updateIndexFullNameAndDisplayName({
      ...johnDoeContact,
      name: { givenName: '', familyName: '' },
      company: '',
      jobTitle: '',
      address: [],
      email: [],
      cozy: [],
      phone: [],
      birthday: '',
      gender: '',
      note: '',
      relationships: { groups: { data: [] } }
    })

    const result = formValuesToContact({
      formValues,
      oldContact: johnDoeContact,
      t
    })
    expect(result).toEqual(expected)
  })

  it('should erase contact datas for emptied fields', () => {
    const formValues = {
      gender: '',
      givenName: '',
      familyName: '',
      company: '',
      jobTitle: '',
      birthday: '',
      note: '',
      address: [{}],
      email: [{}],
      phone: [{}],
      cozy: ''
    }

    const expected = updateIndexFullNameAndDisplayName({
      ...johnDoeContact,
      name: { givenName: '', familyName: '' },
      company: '',
      jobTitle: '',
      address: [],
      email: [],
      cozy: [],
      phone: [],
      birthday: '',
      gender: '',
      note: '',
      relationships: { groups: { data: [] } }
    })

    const result = formValuesToContact({
      formValues,
      oldContact: johnDoeContact,
      t
    })
    expect(result).toEqual(expected)
  })

  it('should not remove contact unformatted address if nothing change', () => {
    const formValues = {
      address: [{ address: '94 Hinton Road 05034 Fresno Singapore' }]
    }

    const oldContact = {
      address: [
        {
          pobox: '94',
          street: 'Hinton Road',
          city: 'Fresno',
          country: 'Singapore',
          postcode: '05034',
          type: 'Work'
        }
      ]
    }

    const expected = {
      address: [
        {
          pobox: '94',
          street: 'Hinton Road',
          city: 'Fresno',
          country: 'Singapore',
          postcode: '05034',
          type: 'Work'
        }
      ]
    }

    const result = formValuesToContact({ formValues, oldContact, t })
    expect(result.address).toEqual(expected.address)
  })

  it('should replace contact unformatted address by formatted one if something change', () => {
    const formValues = {
      address: [{ address: '01 Hinton Road 05034 Fresno, Singapore' }]
    }

    const oldContact = {
      address: [
        {
          pobox: '94',
          street: 'Hinton Road',
          city: 'Fresno',
          country: 'Singapore',
          postcode: '05034',
          type: 'Work'
        }
      ]
    }

    const expected = {
      address: [
        {
          formattedAddress: '01 Hinton Road 05034 Fresno, Singapore',
          primary: true,
          type: undefined
        }
      ]
    }

    const result = formValuesToContact({ formValues, oldContact, t })
    expect(result.address).toEqual(expected.address)
  })

  it('should replace name, index, fullname and displayName properly to name change', () => {
    const formValues = {
      givenName: 'Jane',
      familyName: 'Doe'
    }

    const oldContact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      fullname: 'John Doe',
      displayName: 'John Doe',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'doejohn' }
    }

    const expected = {
      name: {
        givenName: 'Jane',
        familyName: 'Doe'
      },
      fullname: 'Jane Doe',
      displayName: 'Jane Doe',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'doejane' }
    }

    const result = formValuesToContact({ formValues, oldContact, t })
    expect(result.name).toEqual(expected.name)
    expect(result.fullname).toEqual(expected.fullname)
    expect(result.displayName).toEqual(expected.displayName)
    expect(result.indexes).toEqual(expected.indexes)
  })
})
