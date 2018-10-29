import React from 'react'
import renderer from 'react-test-renderer'
import ContactCard from './ContactCard'
import AppLike from '../../tests/Applike'
describe('ContactCard', () => {
  test('should match snapshot', () => {
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
      groups: {
        doctype: 'io.cozy.contacts.groups',
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
          <ContactCard contact={contact} title="title" groups={groups} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
