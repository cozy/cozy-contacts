import React from 'react'
import { render, screen } from '@testing-library/react'

import AppLike from '../tests/Applike'
import ContentRework from './ContentRework'
import { groups } from '../helpers/testData'

const mockedContacts = {
  withIndexes: [
    {
      name: { givenName: 'Jane', familyName: 'Doe' },
      fullname: 'Jane Doe',
      displayName: 'Jane Doe',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Doejane' }
    }
  ],
  withoutIndexes: [
    {
      name: { givenName: 'William', familyName: 'Wallace' }
    }
  ]
}

const setup = ({
  hasServiceBeenLaunched = true,
  contactsWithIndexesResult = {
    data: mockedContacts.withIndexes,
    fetchStatus: 'loaded',
    hasMore: false,
    fetchMore: jest.fn()
  },
  contactsWithNoIndexesResult = {
    data: mockedContacts.withoutIndexes,
    fetchStatus: 'loaded',
    hasMore: false,
    fetchMore: jest.fn()
  },
  allGroupsResult = {
    data: groups,
    fetchStatus: 'loaded'
  }
} = {}) => {
  const root = render(
    <AppLike>
      <ContentRework
        hasServiceBeenLaunched={hasServiceBeenLaunched}
        contactsWithIndexesResult={contactsWithIndexesResult}
        contactsWithNoIndexesResult={contactsWithNoIndexesResult}
        allGroupsResult={allGroupsResult}
      />
    </AppLike>
  )
  return { root }
}

describe('ContentRework', () => {
  it('should show a spinner if data has not been loaded', () => {
    setup({
      hasServiceBeenLaunched: false,
      contactsWithIndexesResult: {
        data: [{}],
        fetchStatus: 'pending',
        hasMore: false,
        fetchMore: jest.fn()
      },
      contactsWithNoIndexesResult: {
        data: [{}],
        fetchStatus: 'pending',
        hasMore: false,
        fetchMore: jest.fn()
      }
    })
    expect(screen.queryByTestId('contactSpinner')).not.toBeNull()
  })

  it('should show a spinner if one query is still loading', () => {
    setup({
      hasServiceBeenLaunched: false,
      contactsWithIndexesResult: {
        data: mockedContacts.withIndexes,
        fetchStatus: 'loaded',
        hasMore: false,
        fetchMore: jest.fn()
      },
      contactsWithNoIndexesResult: {
        data: [{}],
        fetchStatus: 'loading',
        hasMore: false,
        fetchMore: jest.fn()
      }
    })
    expect(screen.queryByTestId('contactSpinner')).not.toBeNull()
  })

  it('should show a spinner if queries are both loaded but still with more data to fetch', () => {
    setup({
      hasServiceBeenLaunched: false,
      contactsWithIndexesResult: {
        data: mockedContacts.withIndexes,
        fetchStatus: 'loaded',
        hasMore: true,
        fetchMore: jest.fn()
      },
      contactsWithNoIndexesResult: {
        data: mockedContacts.withoutIndexes,
        fetchStatus: 'loaded',
        hasMore: true,
        fetchMore: jest.fn()
      }
    })
    expect(screen.queryByTestId('contactSpinner')).not.toBeNull()
  })

  it('should have empty section (for contacts without indexes) if service has been launched', () => {
    setup()
    expect(screen.queryByText('EMPTY')).not.toBeNull()
  })

  it('should not have empty section (for contacts without indexes) if service has not been launched', () => {
    setup({
      hasServiceBeenLaunched: false
    })
    expect(screen.queryByText('EMPTY')).toBeNull()
  })
})
