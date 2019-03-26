import React from 'react'
import renderer from 'react-test-renderer'
import ContactCard from './ContactCard'
import AppLike from '../../tests/Applike'
import {
  DOCTYPE_CONTACT_GROUPS,
  DOCTYPE_CONTACT_ACCOUNTS
} from '../../helpers/doctypes'

describe('ContactCard', () => {
  it('should match snapshot', () => {
    const contact = {
      _id: 'c6899688-6cc6-4ffb-82d4-ab9f9b82c582',
      _rev: '1-9368a4f2e467c449f4a1f5171a784aa8',
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
      phone: [
        { number: '+33 (1)9 14 02 28 31', primary: true },
        { number: '+33 (2)3 99 53 65 21', primary: false }
      ],
      accounts: {
        doctype: DOCTYPE_CONTACT_ACCOUNTS,
        data: []
      },
      groups: {
        doctype: DOCTYPE_CONTACT_GROUPS,
        data: []
      },
      unsupportedField: 'unsupportedField'
    }

    const groups = [
      {
        _id: 'test',
        name: 'toto'
      }
    ]
    const tree = renderer
      .create(
        <AppLike>
          <ContactCard contact={contact} groups={groups} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with accounts', () => {
    const contact = {
      _id: 'c6899688-6cc6-4ffb-82d4-ab9f9b82c582',
      _rev: '1-9368a4f2e467c449f4a1f5171a784aa8',
      address: [],
      birthday: '1998-06-03',
      email: [{ address: 'rikki.white@celmax.name', primary: true }],
      name: { familyName: 'White', givenName: 'Rikki' },
      phone: [],
      accounts: {
        doctype: DOCTYPE_CONTACT_ACCOUNTS,
        data: [
          {
            id: '8336bd7c-ea8a-4a82-8335-799a599e7ebc',
            name: 'john.doe@gmail.com',
            sourceAccount: '55b4b61a-6838-4219-91fa-2b846192f8aa',
            type: 'konnector-google'
          },
          {
            id: '53602dea-6e21-4613-97d6-dde4f5f4dac0',
            name: 'john.doe+inactive@gmail.com',
            sourceAccount: null,
            type: 'konnector-google'
          }
        ]
      },
      groups: {
        doctype: DOCTYPE_CONTACT_GROUPS,
        data: []
      },
      unsupportedField: 'unsupportedField'
    }

    const groups = []
    const tree = renderer
      .create(
        <AppLike>
          <ContactCard contact={contact} groups={groups} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
