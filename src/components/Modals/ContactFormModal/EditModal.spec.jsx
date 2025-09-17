import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useQueryAll, useQuery } from 'cozy-client'

import EditModal from './EditModal'

import { createOrUpdateContact } from '@/connections/allContacts'
import AppLike from '@/tests/Applike'

jest.mock('@/connections/allContacts', () => ({
  createOrUpdateContact: jest.fn()
}))
jest.mock('cozy-client/dist/hooks', () => ({
  ...jest.requireActual('cozy-client/dist/hooks'),
  useQueryAll: jest.fn(),
  useQuery: jest.fn()
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('EditModal component', () => {
  it('should render a contact form in a modal', async () => {
    const contact = {
      _id: 'ID',
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }

    useQuery.mockReturnValue({
      data: contact
    })
    useQueryAll.mockReturnValue({
      data: [contact]
    })

    useParams.mockReturnValue({
      contactId: 'ID'
    })

    const jsx = (
      <AppLike>
        <EditModal />
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

  it('should not call the create function if any of the required fields are missing', async () => {
    const formData = {
      company: 'Cozy Cloud'
    }
    useQuery.mockReturnValue({
      data: undefined
    })
    useQueryAll.mockReturnValue({
      data: []
    })
    useParams.mockReturnValue({
      contactId: 'ID'
    })

    render(
      <AppLike>
        <EditModal />
      </AppLike>
    )

    act(() => {
      fireEvent.change(screen.getByLabelText('Company'), {
        target: { value: formData.company }
      })
    })
    expect(screen.getByLabelText('Company').value).toBe('Cozy Cloud')

    act(() => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(createOrUpdateContact).not.toBeCalled()
  })

  it('should pass previous contact data to the update function', async () => {
    const contact = {
      _id: 'ID',
      name: {
        familyName: 'John',
        givenName: 'Doe'
      }
    }

    useQuery.mockReturnValue({
      data: contact
    })
    useQueryAll.mockReturnValue({
      data: [contact]
    })

    useParams.mockReturnValue({
      contactId: 'ID'
    })

    const formData = {
      company: 'Cozy Cloud',
      relatedContact: []
    }

    const expected = {
      _id: 'ID',
      address: [],
      birthday: '',
      birthplace: '',
      gender: '',
      company: 'Cozy Cloud',
      cozy: [],
      displayName: 'Doe John',
      email: [],
      impp: [],
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
      relationships: { groups: { data: [] }, related: { data: [] } }
    }

    const jsx = (
      <AppLike>
        <EditModal />
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
      oldContact: {
        _id: 'ID',
        name: {
          familyName: 'John',
          givenName: 'Doe'
        }
      },
      formData: expected,
      selectedGroup: expect.anything()
    })
  })
})
