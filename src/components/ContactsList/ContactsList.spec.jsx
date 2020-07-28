import React from 'react'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'

import ContactsList from './ContactsList'
import renderer from 'react-test-renderer'

describe('ContactsListShortcuts', () => {
  test('should display the shortcuts', () => {
    const contacts = [
      {
        _id: 1,
        name: { givenName: 'John', familyName: 'Doe'},
        email: [{ address: 'johndoe@localhost' }]
      }
    ]

    const contactList = (
      <AppLike>
        <ContactsList
          contacts={contacts}
          showModal={() => {}}
        />
      </AppLike>
    )

    const mountedList = mount(contactList)
    const categoryShortcut = mountedList
      .find('ButtonLink')
      .first()

    expect(categoryShortcut).toBeDefined()
    expect(categoryShortcut.text()).toBe('D')
    expect(categoryShortcut.props().href).toBe('#cat-D')

    const shortcutDestination = mountedList
      .find('li')
      .findWhere(l => l.props().id === 'cat-D')
      .first()
    expect(shortcutDestination).toBeDefined()
  })

  test('should display only one shortcut per contact category', () => {
    const contacts = [
      {
        _id: 1,
        name: { givenName: 'John', familyName: 'Doe'},
        email: [{ address: 'johndoe@localhost' }]
      },
      {
        _id: 2,
        name: { givenName: 'Martin', familyName: 'Dupont'},
        email: [{ address: 'martindupont@localhost' }]
      },
    ]

    const contactList = (
      <AppLike>
        <ContactsList
          contacts={contacts}
          showModal={() => {}}
        />
      </AppLike>
    )

    const mountedList = mount(contactList)
    expect(mountedList.find('ButtonLink')).toHaveLength(1);
  })

  test("should shorten the empty category's name", () => {
    const contacts = [
      {
        email: [{ address: 'johndoe@localhost' }]
      }
    ]

    const contactList = (
      <AppLike>
        <ContactsList
          contacts={contacts}
          showModal={() => {}}
        />
      </AppLike>
    )

    const mountedList = mount(contactList)
    const categoryShortcut = mountedList
      .find('ButtonLink')
      .first()
    expect(categoryShortcut).toBeDefined()
    expect(categoryShortcut.text()).toBe('_')
  })

})