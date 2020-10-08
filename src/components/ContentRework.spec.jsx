import React from 'react'
import { render } from '@testing-library/react'

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
    const { root } = setup({
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
    const { getByTestId } = root
    expect(getByTestId('contactSpinner'))
  })

  it('should show a spinner if one query is still loading', () => {
    const { root } = setup({
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
    const { getByTestId } = root
    expect(getByTestId('contactSpinner'))
  })

  it('should show a spinner if queries are both loaded but still with more data to fetch', () => {
    const { root } = setup({
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
    const { getByTestId } = root
    expect(getByTestId('contactSpinner'))
  })

  it('should have empty section (for contacts without indexes) if service has been launched', () => {
    const { root } = setup()
    const { getByText } = root
    expect(getByText('EMPTY'))
  })

  it('should not have empty section (for contacts without indexes) if service has not been launched', () => {
    const { root } = setup({
      hasServiceBeenLaunched: false
    })
    const { queryByText } = root
    expect(queryByText('EMPTY')).toBeNull()
  })
})
