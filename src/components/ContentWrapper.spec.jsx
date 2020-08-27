import React from 'react'
import { render } from '@testing-library/react'
import { createMockClient, useQuery } from 'cozy-client'
import AppLike from '../tests/Applike'
import ContentWrapper from './ContentWrapper'

const client = createMockClient({})
jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

const contactsWithIndexes = [
  {
    name: { givenName: 'Jane', familyName: 'Doe' },
    fullname: 'Jane Doe',
    displayName: 'Jane Doe',
    indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Doejane' }
  }
]

const contactsWithoutIndexes = [
  {
    name: { givenName: 'William', familyName: 'Wallace' }
  }
]

describe('ContentWrapper', () => {
  it("should show a spinner if queries don't have both fetchStatus to loaded", () => {
    const props = { hasServiceBeenLaunched: false }
    const result = {
      data: [{}],
      fetchStatus: 'pending',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(result)

    const jsx = (
      <AppLike client={client}>
        <ContentWrapper {...props} />
      </AppLike>
    )
    const { getByTestId } = render(jsx)
    expect(getByTestId('contactSpinner'))
  })

  it('should show a spinner if queries are both loaded but still with more data to fetch', () => {
    const props = { hasServiceBeenLaunched: false }
    const result = {
      data: [{}],
      fetchStatus: 'loaded',
      hasMore: true,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(result)

    const jsx = (
      <AppLike client={client}>
        <ContentWrapper {...props} />
      </AppLike>
    )
    const { getByTestId } = render(jsx)
    expect(getByTestId('contactSpinner'))
  })

  it('should have empty section (for contacts without indexes) if service has been launched', () => {
    const props = { hasServiceBeenLaunched: true }
    const valueForContactsWithIndexes = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const valueForContactsWithoutIndexes = {
      data: contactsWithoutIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }

    useQuery
      .mockReturnValue(valueForContactsWithoutIndexes)
      .mockReturnValueOnce(valueForContactsWithIndexes)

    const jsx = (
      <AppLike client={client}>
        <ContentWrapper {...props} />
      </AppLike>
    )
    const { getByText } = render(jsx)
    expect(getByText('EMPTY'))
  })

  it('should not have empty section (for contacts without indexes) if service has not been launched', () => {
    const props = { hasServiceBeenLaunched: false }
    const valueForContactsWithIndexes = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const valueForContactsWithoutIndexes = {
      data: contactsWithoutIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }

    useQuery
      .mockReturnValue(valueForContactsWithoutIndexes)
      .mockReturnValueOnce(valueForContactsWithIndexes)

    const jsx = (
      <AppLike client={client}>
        <ContentWrapper {...props} />
      </AppLike>
    )
    const { queryByText } = render(jsx)
    expect(queryByText('EMPTY')).toBeNull()
  })
})
