import { render, screen } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from 'cozy-client'

import ContactInfoModal from './ContactInfoModal'
import AppLike from '../../tests/Applike'

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

    render(jsx)

    expect(screen.queryByTestId('contactSpinner')).not.toBeNull()
  })

  it('should not display the spinner', () => {
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

    render(jsx)

    expect(screen.queryByTestId('contactSpinner')).toBeNull()
  })
})
