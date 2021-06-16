import React from 'react'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import ContactsList from './ContactsList'

describe('ContactsList', () => {
  it('should render an empty list when given contacts is empty', () => {
    expect.assertions(1)

    const givenContacts = []
    const ContactsListInstance = (
      <AppLike>
        <ContactsList contacts={givenContacts} />
      </AppLike>
    )
    const wrapper = mount(ContactsListInstance)
    const contactsEmptyList = wrapper.find('ContactsEmptyList')

    expect(contactsEmptyList.getElements().length).toEqual(1)
  })

  it('should not render an empty list when given contacts is not empty', () => {
    expect.assertions(1)

    const givenContacts = [
      { _id: '012', name: { familyName: 'Doe', givenName: 'John' } }
    ]
    const ContactsListInstance = (
      <AppLike>
        <ContactsList contacts={givenContacts} />
      </AppLike>
    )

    const wrapper = mount(ContactsListInstance)
    const contactsEmptyList = wrapper.find('ContactsEmptyList')

    expect(contactsEmptyList.getElements().length).toEqual(0)
  })

  it('should render a categorized list containing given contacts', () => {
    const givenContacts = [
      { _id: '012', name: { familyName: 'Doe', givenName: 'John' } },
      { _id: '123', name: { familyName: 'Snow', givenName: 'John' } }
    ]
    const ContactsListInstance = (
      <AppLike>
        <ContactsList contacts={givenContacts} />
      </AppLike>
    )

    const wrapper = mount(ContactsListInstance)

    const categorizedList = wrapper.find('CategorizedList')
    const contactListItems = categorizedList.find('ContactListItem')

    expect(categorizedList.getElements().length).toEqual(1)
    expect(contactListItems.getElements().length).toEqual(2)
  })
})
