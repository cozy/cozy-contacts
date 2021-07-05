import React from 'react'
// import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import CategorizedList from './CategorizedList'

describe('CategorizedList', () => {
  it('should render a categoryzed list with sub header matching given contacts', () => {
    expect.assertions(2)

    const givenContacts = [
      {
        _id: '012',
        name: { familyName: 'Doe', givenName: 'John' }
      },
      {
        _id: '013',
        name: { familyName: 'Snow', givenName: 'John' },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'S'
        }
      }
    ]
    const CategorizedListInstance = (
      <AppLike>
        <CategorizedList contacts={givenContacts} />
      </AppLike>
    )
    const wrapper = mount(CategorizedListInstance)
    const listSubheader = wrapper.find('ForwardRef(ListSubheader)')
    const contactsSubList = wrapper.find('ContactsSubList')

    expect(listSubheader.getElements().length).toEqual(2)
    expect(contactsSubList.getElements().length).toEqual(2)
  })
})
