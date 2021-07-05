import React from 'react'

import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import CategorizedList from './CategorizedList'

const defaultSelectionProps = {
  areAllContactsSelected: false,
  handleAllContactSelection: () => {}
}

const aContact = {
  name: { familyName: 'Cozy', givenName: 'Cloud' },
  indexes: { byFamilyNameGivenNameEmailCozyUrl: 'cozycloud' },
  _id: 0
}

const anonymousContact = {
  name: { familyName: '', givenName: '' },
  indexes: { byFamilyNameGivenNameEmailCozyUrl: {} },
  _id: 1
}

const contactList = [
  {
    name: { familyName: 'Co', givenName: 'Zy' },
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'cozy' },
    _id: 2
  },
  {
    name: { familyName: 'Vic', givenName: 'Tor' },
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'victor' },
    _id: 3
  },
  {
    name: { familyName: 'Gre', givenName: 'Noble' },
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'grenoble' },
    _id: 4
  }
]

const mountACategorizedList = contacts => {
  const categorizedListInstance = (
    <AppLike>
      <CategorizedList contacts={contacts} {...defaultSelectionProps} />
    </AppLike>
  )
  return mount(categorizedListInstance)
}

const checkContactListMatchExpectedLinks = (wrapper, expectedLetters) => {
  expect(wrapper).toBeDefined()
  expect(wrapper.length).toEqual(expectedLetters.length)
  for (let i = 0; i < expectedLetters.length; i++) {
    expect(wrapper.at(i).text()).toBe(expectedLetters[i])
  }
}

describe('CategorizedContactList alphabetical links', () => {
  it('should represent a contact initial letter', () => {
    const categorizedList = mountACategorizedList([aContact])
    const alphabeticalLinks = categorizedList.find('Button')
    checkContactListMatchExpectedLinks(alphabeticalLinks, ['C'])
  })

  it('should represent the exact list of initials of a list of contacts', () => {
    const categorizedList = mountACategorizedList(contactList)
    const alphabeticalLinks = categorizedList.find('Button')
    checkContactListMatchExpectedLinks(alphabeticalLinks, ['C', 'G', 'V'])
  })

  it('should provide an ordered list of alphabetical links', () => {
    const categorizedList = mountACategorizedList([
      contactList[2],
      contactList[0],
      contactList[1]
    ])
    const alphabeticalLinks = categorizedList.find('Button')
    checkContactListMatchExpectedLinks(alphabeticalLinks, ['C', 'G', 'V'])
  })

  it('should provide only one alphabetical link for every contact having the same initial', () => {
    const categorizedList = mountACategorizedList(contactList.concat(aContact))
    const alphabeticalLinks = categorizedList.find('Button')
    checkContactListMatchExpectedLinks(alphabeticalLinks, ['C', 'G', 'V'])
  })

  it('should not provide alphabetical link for anonymous contacts', () => {
    const categorizedList = mountACategorizedList(
      contactList.concat(anonymousContact)
    )
    const alphabeticalLinks = categorizedList.find('Button')
    checkContactListMatchExpectedLinks(alphabeticalLinks, ['C', 'G', 'V'])
  })

  it('should match the categorized list snapshot', () => {
    const tree = renderer
      .create(
        <AppLike>
          <CategorizedList contacts={contactList} {...defaultSelectionProps} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
