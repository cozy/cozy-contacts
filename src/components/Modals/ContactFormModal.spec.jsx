import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from 'cozy-client'

import ContactFormModal from './ContactFormModal'
import { createOrUpdateContact } from '../../connections/allContacts'
import AppLike from '../../tests/Applike'

jest.mock('../../connections/allContacts', () => ({
  createContact: jest.fn().mockResolvedValue({ data: 'created' }),
  updateContact: jest.fn().mockResolvedValue({ data: 'updated' }),
  createOrUpdateContact: jest.fn()
}))
jest.mock('cozy-client/dist/hooks', () => ({
  ...jest.requireActual('cozy-client/dist/hooks'),
  useQuery: jest.fn()
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('ContactFormModal component', () => {
  it('should render a contact form in a modal', async () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }

    useQuery.mockReturnValue({
      data: contact
    })

    useParams.mockReturnValue({
      contactId: 'ID'
    })

    const jsx = (
      <AppLike>
        <ContactFormModal />
      </AppLike>
    )

    render(jsx)

    await waitFor(() => {
      const firstNameInput = screen.queryByLabelText('Firstname')
      expect(firstNameInput).not.toBeNull()
      expect(firstNameInput.value).toBe('Doe')
      const lastNameInput = screen.queryByLabelText('Lastname')
      expect(lastNameInput).not.toBeNull()
      expect(lastNameInput.value).toBe('John')
    })
  })

  it('should pass a new contact to the creation function', async () => {
    const formData = {
      company: 'Cozy Cloud'
    }
    useQuery.mockReturnValue({
      data: {}
    })

    useParams.mockReturnValue({
      contactId: 'ID'
    })

    const jsx = (
      <AppLike>
        <ContactFormModal />
      </AppLike>
    )

    const expected = {
      address: [],
      birthday: '',
      birthplace: '',
      gender: '',
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

    render(jsx)

    act(() => {
      fireEvent.change(screen.getByLabelText('Company'), {
        target: { value: formData.company }
      })
    })

    act(() => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(createOrUpdateContact).toHaveBeenCalledWith({
      client: expect.anything(),
      oldContact: {},
      formData: expected,
      selectedGroup: expect.anything()
    })
  })

  it('should pass previous contact data to the update function', async () => {
    const contact = {
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }

    useQuery.mockReturnValue({
      data: contact
    })

    useParams.mockReturnValue({
      contactId: 'ID'
    })

    const formData = {
      company: 'Cozy Cloud'
    }

    const expected = {
      address: [],
      birthday: '',
      birthplace: '',
      gender: '',
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
      <AppLike>
        <ContactFormModal />
      </AppLike>
    )

    render(jsx)

    await waitFor(() => {
      const firstNameInput = screen.queryByLabelText('Firstname')
      expect(firstNameInput).not.toBeNull()
      expect(firstNameInput.value).toBe('Doe')
      const lastNameInput = screen.queryByLabelText('Lastname')
      expect(lastNameInput).not.toBeNull()
      expect(lastNameInput.value).toBe('John')
    })

    act(() => {
      fireEvent.change(screen.getByLabelText('Company'), {
        target: { value: formData.company }
      })
    })

    act(() => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(createOrUpdateContact).toHaveBeenCalledWith({
      client: expect.anything(),
      oldContact: contact,
      formData: expected,
      selectedGroup: expect.anything()
    })
  })
})
