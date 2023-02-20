import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useParams } from 'react-router-dom'

import { useQuery } from 'cozy-client'

import AppLike from '../../tests/Applike'
import ContactFormModal from './ContactFormModal'
import { createOrUpdateContact } from '../../connections/allContacts'

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

    const { getByRole } = render(jsx)

    await waitFor(() => {
      const firstNameInput = getByRole('textbox', { name: 'Firstname' })
      const lastNameInput = getByRole('textbox', { name: 'Lastname' })
      expect(firstNameInput.value).toBe('Doe')
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

    const { getByRole } = render(jsx)

    await waitFor(() => {
      const companyInput = getByRole('textbox', { name: 'Company' })
      fireEvent.change(companyInput, {
        target: { value: formData.company }
      })

      const submitButton = getByRole('button', { name: 'Save' })
      fireEvent.click(submitButton)

      expect(createOrUpdateContact).toHaveBeenCalledWith({
        client: expect.anything(),
        oldContact: {},
        formData: expected,
        selectedGroup: expect.anything()
      })
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

    const { getByRole } = render(jsx)

    let companyInput

    await waitFor(() => {
      companyInput = getByRole('textbox', { name: 'Company' })
    })

    await act(async () => {
      fireEvent.change(companyInput, {
        target: { value: formData.company }
      })
    })

    let submitButton

    await waitFor(() => {
      submitButton = getByRole('button', { name: 'Save' })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(createOrUpdateContact).toHaveBeenCalledWith({
      client: expect.anything(),
      oldContact: contact,
      formData: expected,
      selectedGroup: expect.anything()
    })
  })
})
