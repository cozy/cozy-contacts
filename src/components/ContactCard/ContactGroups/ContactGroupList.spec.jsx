import React from 'react'
import { render, screen } from '@testing-library/react'
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

    render(
      <AppLike>
        <ContactGroupList contact={contactMock} allGroups={groupsMock} />
      </AppLike>
    )

    const contactGroupTags = screen.queryAllByRole('listitem')
    expect(contactGroupTags.length).toEqual(2)
    expect(contactGroupTags[0].textContent).toEqual(groupsMock[0].name)
    expect(contactGroupTags[1].textContent).toEqual(groupsMock[1].name)
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
