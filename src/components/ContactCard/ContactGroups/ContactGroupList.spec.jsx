import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { DOCTYPE_CONTACT_GROUPS } from '../../../helpers/doctypes'

import ContactGroupList from './ContactGroupList'
import AppLike from '../../../tests/Applike'
describe('ContactGroupList', () => {
  it('should display groups', () => {
    const contactMock = {
      groups: {
        data: [
          { _id: 'a', _type: DOCTYPE_CONTACT_GROUPS },
          { _id: 'b', _type: DOCTYPE_CONTACT_GROUPS }
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
        <ContactGroupList contact={contactMock} allGroups={groupsMock} />
      </AppLike>
    )

    const contactGroupTags = app.find('li')

    expect(contactGroupTags.length).toEqual(2)
    expect(contactGroupTags.at(0).text()).toEqual(groupsMock[0].name)
    expect(contactGroupTags.at(1).text()).toEqual(groupsMock[1].name)
  })
  it('should match the contact snapshot', () => {
    const contactMock = {
      groups: {
        data: [
          { _id: 'a', _type: DOCTYPE_CONTACT_GROUPS },
          { _id: 'b', _type: DOCTYPE_CONTACT_GROUPS }
        ]
      }
    }
    const groupsMock = [
      { _id: 'a', name: 'The A Team' },
      { _id: 'b', name: 'The B Team' },
      { _id: 'c', name: 'The C Team' }
    ]

    const tree = renderer
      .create(
        <AppLike>
          <ContactGroupList
            contact={contactMock}
            allGroups={groupsMock}
            title="Foo"
          />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
