import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

import { DumbContactFormModal } from './ContactFormModal'
import AppLike from '../../tests/Applike'
import { createContact, updateContact } from '../../connections/allContacts'

const client = createMockClient({})
jest.mock('../../connections/allContacts', () => ({
  createContact: jest.fn().mockResolvedValue({ data: 'created' }),
  updateContact: jest.fn().mockResolvedValue({ data: 'updated' })
}))

describe('ContactFormModal component', () => {
  let props

  beforeEach(() => {
    props = {
      afterMutation: jest.fn(),
      contact: null,
      onClose: jest.fn(),
      title: 'Edit contact',
      t: jest.fn(x => x),
      client: client
    }
  })

  it('should render a contact form in a modal', () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }
    const propsWithContact = {
      ...props,
      contact
    }

    const jsx = (
      <AppLike client={client}>
        <DumbContactFormModal {...propsWithContact} />
      </AppLike>
    )

    const { getByRole } = render(jsx)
    const firstNameInput = getByRole('textbox', { name: 'Firstname' })
    const lastNameInput = getByRole('textbox', { name: 'Lastname' })
    expect(firstNameInput.value).toBe('Doe')
    expect(lastNameInput.value).toBe('John')
  })

  it('should pass a new contact to the creation function', () => {
    const formData = {
      company: 'Cozy Cloud'
    }

    const jsx = (
      <AppLike client={client}>
        <DumbContactFormModal {...props} />
      </AppLike>
    )

    const expected = {
      address: [],
      birthday: '',
      company: 'Cozy Cloud',
      cozy: [],
      displayName: '',
      email: [],
      fullname: '',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: null },
      jobTitle: '',
      metadata: { cozy: true, version: 1 },
      name: { familyName: '', givenName: '' },
      note: '',
      phone: [],
      relationships: { groups: { data: [] } }
    }

    const { getByRole } = render(jsx)
    const companyInput = getByRole('textbox', { name: 'Company' })
    fireEvent.change(companyInput, {
      target: { value: formData.company }
    })

    const submitButton = getByRole('button', { name: 'save' })
    fireEvent.click(submitButton)

    expect(createContact).toHaveBeenCalledWith(client, expected)
  })

  it('should pass previous contact data to the update function', () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }
    const propsWithContact = {
      ...props,
      contact
    }
    const formData = {
      company: 'Cozy Cloud'
    }

    const expected = {
      address: [],
      birthday: '',
      company: 'Cozy Cloud',
      cozy: [],
      displayName: 'Doe John',
      email: [],
      fullname: 'Doe John',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'johndoe' },
      jobTitle: '',
      metadata: { cozy: true, version: 1 },
      name: {
        familyName: 'John',
        givenName: 'Doe'
      },
      note: '',
      phone: [],
      relationships: { groups: { data: [] } }
    }

    const jsx = (
      <AppLike client={client}>
        <DumbContactFormModal {...propsWithContact} />
      </AppLike>
    )

    const { getByRole } = render(jsx)
    const companyInput = getByRole('textbox', { name: 'Company' })
    fireEvent.change(companyInput, {
      target: { value: formData.company }
    })
    const submitButton = getByRole('button', { name: 'save' })
    fireEvent.click(submitButton)

    expect(updateContact).toHaveBeenCalledWith(client, expected)
  })
})
