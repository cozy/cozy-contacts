import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AppLike from '../tests/Applike'
import ContentResult from './ContentResult'
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
  ],
  withGroup: [
    {
      displayName: 'Jack Ingroup',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: 'jackingroup' },
      relationships: {
        groups: {
          data: groups
        }
      }
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
      <ContentResult
        hasServiceBeenLaunched={hasServiceBeenLaunched}
        contactsWithIndexesResult={contactsWithIndexesResult}
        contactsWithNoIndexesResult={contactsWithNoIndexesResult}
        allGroupsResult={allGroupsResult}
      />
    </AppLike>
  )
  return { root }
}

describe('ContentResult', () => {
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

describe('ContentResult - filtering', () => {
  it('should show only filtered contacts after selecting a group filter', () => {
    const { root } = setup({
      contactsWithIndexesResult: {
        data: [mockedContacts.withIndexes[0], mockedContacts.withGroup[0]]
      }
    })

    const { getByText, queryByText } = root

    // contacts with and without group should be present
    expect(getByText('Ingroup'))
    expect(getByText('Doe'))

    fireEvent.click(getByText('All contacts'))
    fireEvent.click(getByText(groups[0].name))

    // should not return an empty contact list
    expect(
      queryByText(
        'You will soon be able to import your contacts from other services (iCloud, Facebook...).'
      )
    ).toBeNull()

    // contacts without group should not be present
    expect(getByText('Ingroup'))
    expect(queryByText('Doe')).toBeNull()
  })

  it('should show empty list after filtering contacts with no group', () => {
    const { root } = setup()

    const { getByText } = root

    fireEvent.click(getByText('All contacts'))
    fireEvent.click(getByText(groups[0].name))

    // should return an empty contact list
    expect(
      getByText(
        'You will soon be able to import your contacts from other services (iCloud, Facebook...).'
      )
    )
  })
})
