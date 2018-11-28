import React from 'react'
import renderer from 'react-test-renderer'
import ContactGroupManager from './ContactGroupManager'
import AppLike from '../../tests/Applike'
import { DOCTYPE_CONTACT_GROUPS } from '../../helpers/doctypes'

describe('ContactGroupManager', () => {
  it('should display the group select', () => {
    const contactGroupsMock = [
      { _id: 'a', _type: DOCTYPE_CONTACT_GROUPS },
      { _id: 'b', _type: DOCTYPE_CONTACT_GROUPS }
    ]
    const groupsMock = [
      { _id: 'a', name: 'The A Team' },
      { _id: 'b', name: 'The B Team' },
      { _id: 'c', name: 'The C Team' }
    ]

    const tree = renderer
      .create(
        <AppLike>
          <ContactGroupManager
            contactGroups={contactGroupsMock}
            allGroups={groupsMock}
            onGroupSelectionChange={() => {}}
          />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
