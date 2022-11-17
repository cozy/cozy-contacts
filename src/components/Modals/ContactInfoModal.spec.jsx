import React from 'react'
import { render, screen } from '@testing-library/react'

import { useQuery } from 'cozy-client'
import { useParams } from 'react-router-dom'

import AppLike from '../../tests/Applike'
import ContactInfoModal from './ContactInfoModal'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('ContactCardModal', () => {
  it('should display the spinner', async () => {
    useParams.mockReturnValue({
      contactId: 'ID'
    })

    useQuery.mockReturnValueOnce({
      data: {},
      fetchStatus: 'pending',
      hasMore: true,
      fetchMore: jest.fn()
    })

    useQuery.mockReturnValueOnce({
      data: [],
      fetchStatus: 'pending',
      hasMore: true,
      fetchMore: jest.fn()
    })

    const jsx = (
      <AppLike>
        <ContactInfoModal />
      </AppLike>
    )

    const { findByTestId } = render(jsx)
    expect(await findByTestId('contactSpinner'))
  })

  it('should not display the spinner', async () => {
    useParams.mockReturnValue({
      contactId: 'ID'
    })

    useQuery.mockReturnValueOnce({
      data: {
        name: {
          familyName: 'John',
          givenName: 'Doe'
        },
        accounts: {
          data: []
        },
        groups: {
          data: []
        }
      },
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    })

    useQuery.mockReturnValueOnce({
      data: [],
      fetchStatus: 'loaded',
      hasMore: true,
      fetchMore: jest.fn()
    })

    const jsx = (
      <AppLike>
        <ContactInfoModal />
      </AppLike>
    )

    const { findByText } = render(jsx)
    await findByText(/John/)
    const contactSpinner = screen.queryByTestId('contactSpinner')
    expect(contactSpinner).toBeNull()
  })
})
