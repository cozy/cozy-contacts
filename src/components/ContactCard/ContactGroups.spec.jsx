import React from 'react'
import { mount } from 'enzyme'
import { DOCTYPE_CONTACT_GROUPS } from '../../helpers/doctypes'

import { ContactGroups } from './ContactGroups'
import AppLike from '../../tests/Applike'
describe('ContactGroups', () => {
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
        <ContactGroups contact={contactMock} allGroups={groupsMock} />
      </AppLike>
    )

    const contactGroupTags = app.find('li.contact-groups-list__tag')

    expect(contactGroupTags.length).toEqual(2)
    expect(contactGroupTags.at(0).text()).toEqual(groupsMock[0].name)
    expect(contactGroupTags.at(1).text()).toEqual(groupsMock[1].name)
  })
})
