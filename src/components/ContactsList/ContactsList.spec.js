import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import ContactsList from './ContactsList'

import { johnDoeContact } from '../../helpers/testData'

const fakeContactWithIndexes = {
  ...johnDoeContact,
  indexes: {
    byFamilyNameGivenNameEmailCozyUrl: 'john.doe@cozycloud.cc'
  }
}

describe('ContactsList', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <AppLike>
          <ContactsList contacts={[fakeContactWithIndexes]} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should renders an empty state', () => {
    const contactsListInstance = (
      <AppLike>
        <ContactsList contacts={[]} />
      </AppLike>
    )
    const contactslist = mount(contactsListInstance)
    const contactsemptylist = contactslist.find('ContactsEmptyList')
    expect(contactsemptylist).toBeDefined()
  })
})
