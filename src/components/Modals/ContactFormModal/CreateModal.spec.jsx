import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useQueryAll, useQuery } from 'cozy-client'

import CreateModal from './CreateModal'

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

describe('CreateModal component', () => {
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
        <CreateModal />
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

  it('should pass a new contact to the creation function', async () => {
    const formData = {
      firstname: 'bob'
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

    const expected = {
      address: [],
      birthday: '',
      birthplace: '',
      gender: '',
      company: '',
      cozy: [],
      displayName: 'bob',
      email: [],
      impp: [],
      fullname: 'bob',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'bob' },
      jobTitle: '',
      metadata: { cozy: true, version: 1 },
      name: { familyName: '', givenName: 'bob' },
      note: '',
      phone: [],
      relationships: { groups: { data: [] }, related: { data: [] } }
    }

    render(
      <AppLike>
        <CreateModal />
      </AppLike>
    )

    fireEvent.change(screen.getByLabelText('Firstname'), {
      target: { value: formData.firstname }
    })

    fireEvent.click(screen.getByText('Save'))

    expect(createOrUpdateContact).toBeCalledWith({
      client: expect.anything(),
      oldContact: undefined,
      formData: expected,
      selectedGroup: expect.anything()
    })
  })
})
