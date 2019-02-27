import React from 'react'
import { shallow } from 'enzyme'

import { DumbContactFormModal } from './ContactFormModal'

describe('ContactFormModal component', () => {
  let props

  beforeEach(() => {
    props = {
      afterMutation: jest.fn(),
      contact: null,
      createContact: jest.fn().mockResolvedValue({ data: 'created' }),
      onClose: jest.fn(),
      title: 'Edit contact',
      updateContact: jest.fn().mockResolvedValue({ data: 'updated' })
    }
  })

  it('should render a contact form in a modal', () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      },
      birthday: '1959-05-15'
    }
    const propsWithContact = {
      ...props,
      contact
    }
    const jsx = <DumbContactFormModal {...propsWithContact} />
    const wrapper = shallow(jsx)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass a new contact to the creation function', () => {
    const formData = {
      company: 'Cozy Cloud'
    }
    const jsx = <DumbContactFormModal {...props} />
    const wrapper = shallow(jsx)
    const form = wrapper.find('Wrapper')
    form.prop('onSubmit')(formData)
    expect(props.createContact).toHaveBeenCalledWith({
      company: 'Cozy Cloud'
    })
  })

  it('should pass previous contact data to the update function', () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      },
      _type: 'io.cozy.contacts',
      _id: '789172abb56edf565098',
      cozyMetadata: {
        createdByApp: 'Cozy Contacts'
      }
    }
    const propsWithContact = {
      ...props,
      contact
    }
    const jsx = <DumbContactFormModal {...propsWithContact} />
    const wrapper = shallow(jsx)
    const form = wrapper.find('Wrapper')

    const formData = {
      company: 'Cozy Cloud'
    }
    form.prop('onSubmit')(formData)
    expect(props.updateContact).toHaveBeenCalledWith({
      name: {
        familyName: 'John',
        givenName: 'Doe'
      },
      _type: 'io.cozy.contacts',
      _id: '789172abb56edf565098',
      cozyMetadata: {
        createdByApp: 'Cozy Contacts'
      },
      company: 'Cozy Cloud'
    })
  })
})
