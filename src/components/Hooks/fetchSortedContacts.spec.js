// import React from 'react'
// import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useQuery } from 'cozy-client'
// import AppLike from '../../tests/Applike'
import fetchSortedContacts from './fetchSortedContacts'

// const client = createMockClient({})
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
  it('should returns fetchesAreFinished at false and empty contact array if all queries are pending', () => {
    const hasServiceBeenLaunched = false
    const response = {
      data: [{}],
      fetchStatus: 'pending',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const [fetchesAreFinished, sortedContacts] = result.current

    expect(fetchesAreFinished).toBeFalsy()
    expect(sortedContacts).toHaveLength(0)
  })

  it('should returns fetchesAreFinished at false and empty contact array if all queries are loading', () => {
    const hasServiceBeenLaunched = false
    const response = {
      data: [{}],
      fetchStatus: 'loading',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const [fetchesAreFinished, sortedContacts] = result.current

    expect(fetchesAreFinished).toBeFalsy()
    expect(sortedContacts).toHaveLength(0)
  })

  it('should returns fetchesAreFinished at false and empty contact array if queries have more to fetch', () => {
    const hasServiceBeenLaunched = false
    const response = {
      data: [{}],
      fetchStatus: 'loaded',
      hasMore: true,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const [fetchesAreFinished, sortedContacts] = result.current

    expect(fetchesAreFinished).toBeFalsy()
    expect(sortedContacts).toHaveLength(0)
  })

  it('should returns fetchesAreFinished at false and empty contact array if one query are not finished', () => {
    const hasServiceBeenLaunched = false
    const response1 = {
      data: [{}],
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const response2 = {
      data: [{}],
      fetchStatus: 'loading',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response2).mockReturnValueOnce(response1)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const [fetchesAreFinished, sortedContacts] = result.current

    expect(fetchesAreFinished).toBeFalsy()
    expect(sortedContacts).toHaveLength(0)
  })

  it('should returns fetchesAreFinished at true and contacts if queries are finished', () => {
    const hasServiceBeenLaunched = false
    const response1 = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const response2 = {
      data: contactsWithoutIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response2).mockReturnValueOnce(response1)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const [fetchesAreFinished, sortedContacts] = result.current

    expect(fetchesAreFinished).toBeTruthy()
    expect(sortedContacts).toHaveLength(2)
  })

  it('should returns harmonized contacts if Service has not been launched', () => {
    const hasServiceBeenLaunched = false
    const response1 = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const response2 = {
      data: contactsWithoutIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response2).mockReturnValueOnce(response1)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const sortedContacts = result.current[1]

    const expected = [
      {
        displayName: 'Jane Doe',
        fullname: 'Jane Doe',
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Doejane' },
        name: { familyName: 'Doe', givenName: 'Jane' }
      },
      {
        displayName: 'William Wallace',
        fullname: 'William Wallace',
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Wallacewilliam' },
        name: { familyName: 'Wallace', givenName: 'William' }
      }
    ]
    expect(sortedContacts).toEqual(expected)
  })

  it('should returns not harmonized contacts if Service has already been launched', () => {
    const hasServiceBeenLaunched = true
    const response1 = {
      data: contactsWithIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    const response2 = {
      data: contactsWithoutIndexes,
      fetchStatus: 'loaded',
      hasMore: false,
      fetchMore: jest.fn()
    }
    useQuery.mockReturnValue(response2).mockReturnValueOnce(response1)

    const { result } = renderHook(() =>
      fetchSortedContacts(hasServiceBeenLaunched)
    )
    const sortedContacts = result.current[1]

    const expected = [
      {
        displayName: 'Jane Doe',
        fullname: 'Jane Doe',
        indexes: { byFamilyNameGivenNameEmailCozyUrl: 'Doejane' },
        name: { familyName: 'Doe', givenName: 'Jane' }
      },
      { name: { familyName: 'Wallace', givenName: 'William' } }
    ]
    expect(sortedContacts).toEqual(expected)
  })
})
