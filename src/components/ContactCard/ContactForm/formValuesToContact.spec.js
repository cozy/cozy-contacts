import formValuesToContact from './formValuesToContact'
import { johnDoeFormValues } from '../../../helpers/testData'

describe('formValuesToContact', () => {
  it('should convert form values to contact', () => {
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
      note:
        'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
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
    const result = formValuesToContact(johnDoeFormValues, null)
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
      birthday: null,
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
      birthday: null,
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

    const result = formValuesToContact(formValues, null)
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
    const result = formValuesToContact(johnDoeFormValues, oldContact)
    expect(result.metadata).toEqual(expectedMetadata)
  })

  it('should not erase additional information if it was present in the contact', () => {
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

    const result = formValuesToContact(johnDoeFormValues, oldContact)
    Object.keys(oldContact).map(key =>
      expect(result[key]).toEqual(expected[key])
    )
  })

  it('should not erase attributes not in the doctype if it was present in the contact', () => {
    const oldContact = {
      otherInfoNotInDoctype: {
        information: 'Lorem Ipsum'
      }
    }
    const expected = { information: 'Lorem Ipsum' }

    const result = formValuesToContact(johnDoeFormValues, oldContact)
    expect(result.otherInfoNotInDoctype).toEqual(expected)
  })
})
