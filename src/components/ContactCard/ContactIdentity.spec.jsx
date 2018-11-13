import React from 'react'
import { mount } from 'enzyme'

import ContactIdentity from './ContactIdentity'
import AppLike from '../../tests/Applike'
describe('ContactIdentity', () => {
  it('should have the right informations', () => {
    const contactWithoutName = {
      email: [{ address: 'stephen.flinn@cirpria.me', primary: true }],
      name: { familyName: 'Flinn', givenName: 'Stephen' },
      groups: {
        data: [
          { _id: 'a', _type: 'io.cozy.contacts.groups' },
          { _id: 'b', _type: 'io.cozy.contacts.groups' }
        ]
      }
    }
    const groupsMock = [
      { _id: 'a', name: 'The A Team' },
      { _id: 'b', name: 'The B Team' },
      { _id: 'c', name: 'The C Team' }
    ]

    const app = mount(
      <AppLike>
        <ContactIdentity contact={contactWithoutName} groups={groupsMock} />
      </AppLike>
    )
    const avatar = app.find('Avatar')
    expect(avatar.prop('text')).toEqual('SF')
  })

  it('should have the right informations even if the contact does not have a name', () => {
    const contactWithoutName = {
      email: [{ address: 'stephen.flinn@cirpria.me', primary: true }],
      groups: {
        data: [
          { _id: 'a', _type: 'io.cozy.contacts.groups' },
          { _id: 'b', _type: 'io.cozy.contacts.groups' }
        ]
      }
    }
    const groupsMock = [
      { _id: 'a', name: 'The A Team' },
      { _id: 'b', name: 'The B Team' },
      { _id: 'c', name: 'The C Team' }
    ]

    const app = mount(
      <AppLike>
        <ContactIdentity contact={contactWithoutName} groups={groupsMock} />
      </AppLike>
    )
    const avatar = app.find('Avatar')
    expect(avatar.prop('text')).toEqual('')
  })
})
