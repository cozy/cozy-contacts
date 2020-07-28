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
      email: [
        {
          address: 'john.doe@cozycloud.cc',
          primary: true,
          type: undefined
        },
        {
          address: 'john.doe@posteo.net',
          type: 'personal',
          primary: false
        }
      ],
      birthday: '1999-5-1',
      company: 'Cozy cloud',
      jobTitle: 'Dreamer',
      cozy: [
        {
          label: 'MyCozy',
          primary: true,
          url: 'https://johndoe.mycozy.cloud'
        }
      ],
      fullname: 'John Doe',
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      metadata: {
        cozy: true,
        version: 1
      },
      note:
        'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
      phone: [
        {
          number: '+33 (2)0 90 00 54 04',
          primary: true,
          type: undefined
        },
        {
          number: '+33 6 77 11 22 33',
          primary: false,
          type: undefined
        }
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
      familyName: 'Jane',
      givenName: 'Doe',
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
      fullname: 'Doe Jane',
      name: { givenName: 'Doe', familyName: 'Jane' },
      email: [],
      address: [],
      phone: [],
      cozy: [],
      company: '',
      jobTitle: '',
      birthday: null,
      note: '',
      relationships: { groups: { data: [] } },
      metadata: { version: 1, cozy: true }
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
})
