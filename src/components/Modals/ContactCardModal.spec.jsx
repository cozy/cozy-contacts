import React from 'react'
import ContactCardModal from './ContactCardModal'
import { render } from '@testing-library/react'
import AppLike from '../../tests/Applike'
import { createMockClient, useQuery } from 'cozy-client'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

const client = createMockClient({})

describe('ContactCardModal', () => {
  it('should display the spinner', async () => {
    const props = {
      id: 'contactCardModal',
      onClose: jest.fn,
      deleteContact: jest.fn
    }
    useQuery.mockReturnValue({
      data: [],
      fetchStatus: 'pending',
      hasMore: true,
      fetchMore: jest.fn()
    })

    const jsx = (
      <AppLike client={client}>
        <ContactCardModal {...props} />
      </AppLike>
    )

    const { findByTestId } = render(jsx)
    expect(await findByTestId('contactSpinner'))
  })
})
