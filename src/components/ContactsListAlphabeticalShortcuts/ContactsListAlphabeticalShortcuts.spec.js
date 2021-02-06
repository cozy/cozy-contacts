import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import ContactsListAlphabeticalShortcuts from './ContactsListAlphabeticalShortcuts'

describe('ContactsListAlphabeticalShortcuts', () => {
  it('should display alphabetical shortcuts for 1 letter', () => {
    const contacts = [
        { name: { familyName: 'Doe', givenName: 'John' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "doejohn" } }
    ]
    const alphabeticalShortcutsInstance = (
      <AppLike>
        <ContactsListAlphabeticalShortcuts contacts={contacts} />
      </AppLike>
    )
    const alphabeticalShortcuts = mount(alphabeticalShortcutsInstance)
    const shortcutLinks = alphabeticalShortcuts.find('a')
    expect(shortcutLinks).toBeDefined()
    expect(shortcutLinks.text()).toBe('D')
  })

  it('should display alphabetical shortcuts for 2 letters', () => {
    const contacts = [
        { name: { familyName: 'Backer', givenName: 'Miles' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "backermiles" } },
        { name: { familyName: 'Doe', givenName: 'John' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "doejohn" } },
    ]
    const alphabeticalShortcutsInstance = (
      <AppLike>
        <ContactsListAlphabeticalShortcuts contacts={contacts} />
      </AppLike>
    )
    const alphabeticalShortcuts = mount(alphabeticalShortcutsInstance)
    const shortcutLinks = alphabeticalShortcuts.find('a')
    expect(shortcutLinks).toBeDefined()
    expect(shortcutLinks.length).toBe(2)
    expect(shortcutLinks.at(0).text()).toBe('B')
    expect(shortcutLinks.at(1).text()).toBe('D')
  })

  it('should display alphabetical shortcuts for 2 ordered letters even if contacts list is not ordered', () => {
    const contacts = [
        { name: { familyName: 'Doe', givenName: 'John' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "doejohn" } },
        { name: { familyName: 'Backer', givenName: 'Miles' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "backermiles" } },
    ]
    const alphabeticalShortcutsInstance = (
      <AppLike>
        <ContactsListAlphabeticalShortcuts contacts={contacts} />
      </AppLike>
    )
    const alphabeticalShortcuts = mount(alphabeticalShortcutsInstance)
    const shortcutLinks = alphabeticalShortcuts.find('a')
    expect(shortcutLinks).toBeDefined()
    expect(shortcutLinks.length).toBe(2)
    expect(shortcutLinks.at(0).text()).toBe('B')
    expect(shortcutLinks.at(1).text()).toBe('D')
  })

  it('should accept empty array', () => {
    const contacts = []
    const alphabeticalShortcutsInstance = (
      <AppLike>
        <ContactsListAlphabeticalShortcuts contacts={contacts} />
      </AppLike>
    )
    const alphabeticalShortcuts = mount(alphabeticalShortcutsInstance)
    const shortcutLinks = alphabeticalShortcuts.find('a')
    expect(shortcutLinks).toBeDefined()
    expect(shortcutLinks.length).toBe(0)
  })

  it('should match the alphabetical shortcuts snapshot', () => {
    const contacts = [
        { name: { familyName: 'Backer', givenName: 'Miles' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "backermiles" } },
        { name: { familyName: 'Doe', givenName: 'John' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "doejohn" } },
        { name: { familyName: 'Carroll', givenName: 'Aiden' }, indexes: { byFamilyNameGivenNameEmailCozyUrl: "carrollaiden" } },
    ]

    const tree = renderer
      .create(
        <AppLike>
          <ContactsListAlphabeticalShortcuts contacts={contacts} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
