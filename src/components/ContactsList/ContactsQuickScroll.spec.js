import React from 'react'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import ContactsQuickScroll from './ContactsQuickScroll'

const contacts = [
  {
    name: { familyName: 'A', givenName: 'John' },
    email: [{ address: 'johnA@localhost' }],
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'A' }
  },
  {
    name: { familyName: 'B', givenName: 'John' },
    email: [{ address: 'johnB@localhost' }],
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'B' }
  },
  {
    name: { familyName: 'C', givenName: 'John' },
    email: [{ address: 'johnC@localhost' }],
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'C' }
  }
]

describe('ContactsQuickScroll', () => {
  it('should not display without data', () => {
    const contactsQuickScrollInstance = (
      <AppLike>
        <ContactsQuickScroll contacts={[]} />
      </AppLike>
    )
    const contactsQuickScroll = mount(contactsQuickScrollInstance)
    expect(contactsQuickScroll.text()).toBe('')
  })

  it('should display with data', () => {
    const contactsQuickScrollInstance = (
      <AppLike>
        <ContactsQuickScroll contacts={contacts} />
      </AppLike>
    )
    const contactsQuickScroll = mount(contactsQuickScrollInstance)
    expect(contactsQuickScroll.find('.letter-selector > .letter'))
      .toHaveLength(contacts.length)
  })
})
