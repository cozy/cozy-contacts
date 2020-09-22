import React from 'react'
import { render } from '@testing-library/react'
import { createMockClient } from 'cozy-client'
import AppLike from '../tests/Applike'
import ContentResult from './ContentResult'

const client = createMockClient({})

const contactsWithIndexes = [
  {
    name: { givenName: 'Jane', familyName: 'Doe' },
    fullname: 'Jane Doe',
    displayName: 'Jane Doe',
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Doejane' }
  }
]

const contactsWithNoIndexes = [
  {
    name: { givenName: 'William', familyName: 'Wallace' }
  }
]

describe('ContentResult', () => {
  it('should show a spinner if data has not been loaded', () => {
    const hasServiceBeenLaunched = false
    const contactsWithIndexesResult = {
      data: [{}],
      fetchStatus: 'pending',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const contactsWithNoIndexesResult = {
      data: [{}],
      fetchStatus: 'pending',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const props = {
      hasServiceBeenLaunched,
      contactsWithIndexesResult,
      contactsWithNoIndexesResult
    }
    const jsx = (
      <AppLike client={client}>
        <ContentResult {...props} />
      </AppLike>
    )
    const { getByTestId } = render(jsx)
    expect(getByTestId('contactSpinner'))
  })

  it('should show a spinner if one query is still loading', () => {
    const hasServiceBeenLaunched = false
    const contactsWithIndexesResult = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const contactsWithNoIndexesResult = {
      data: [{}],
      fetchStatus: 'loading',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const props = {
      hasServiceBeenLaunched,
      contactsWithIndexesResult,
      contactsWithNoIndexesResult
    }
    const jsx = (
      <AppLike client={client}>
        <ContentResult {...props} />
      </AppLike>
    )
    const { getByTestId } = render(jsx)
    expect(getByTestId('contactSpinner'))
  })

  it('should show a spinner if queries are both loaded but still with more data to fetch', () => {
    const hasServiceBeenLaunched = false
    const contactsWithIndexesResult = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: true,
      fetchMore: jest.fn()
    }
    const contactsWithNoIndexesResult = {
      data: contactsWithNoIndexes,
      fetchStatus: 'loaded',
      hasMore: true,
      fetchMore: jest.fn()
    }
    const props = {
      hasServiceBeenLaunched,
      contactsWithIndexesResult,
      contactsWithNoIndexesResult
    }
    const jsx = (
      <AppLike client={client}>
        <ContentResult {...props} />
      </AppLike>
    )
    const { getByTestId } = render(jsx)
    expect(getByTestId('contactSpinner'))
  })

  it('should have empty section (for contacts without indexes) if service has been launched', () => {
    const hasServiceBeenLaunched = true
    const contactsWithIndexesResult = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const contactsWithNoIndexesResult = {
      data: contactsWithNoIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const props = {
      hasServiceBeenLaunched,
      contactsWithIndexesResult,
      contactsWithNoIndexesResult
    }
    const jsx = (
      <AppLike client={client}>
        <ContentResult {...props} />
      </AppLike>
    )
    const { getByText } = render(jsx)
    expect(getByText('EMPTY'))
  })

  it('should not have empty section (for contacts without indexes) if service has not been launched', () => {
    const hasServiceBeenLaunched = false
    const contactsWithIndexesResult = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const contactsWithNoIndexesResult = {
      data: contactsWithNoIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const props = {
      hasServiceBeenLaunched,
      contactsWithIndexesResult,
      contactsWithNoIndexesResult
    }
    const jsx = (
      <AppLike client={client}>
        <ContentResult {...props} />
      </AppLike>
    )
    const { queryByText } = render(jsx)
    expect(queryByText('EMPTY')).toBeNull()
  })
})
