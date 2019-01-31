import React from 'react'
import { shallow } from 'enzyme'

import { DumbContactFormModal } from './ContactFormModal'

describe('ContactFormModal component', () => {
  it('should render a contact form in a modal', () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      },
      birthday: '1959-05-15'
    }
    const onCloseSpy = jest.fn()
    const props = {
      afterMutation: jest.fn(),
      contact: contact,
      createContact: jest.fn(),
      onClose: onCloseSpy,
      title: 'Edit contact',
      updateContact: jest.fn()
    }
    const jsx = <DumbContactFormModal {...props} />
    const wrapper = shallow(jsx)
    expect(wrapper).toMatchSnapshot()
  })
})
