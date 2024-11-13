import { waitFor } from '@testing-library/react'

import { cleanRelatedContactsService } from './cleanRelatedContactsService'

jest.mock('cozy-client', () => ({
  Q: jest.fn(() => ({
    where: jest.fn(() => ({
      indexFields: jest.fn(() => ({
        limitBy: jest.fn()
      }))
    }))
  }))
}))

const setup = ({
  mockQueryAll = jest.fn(),
  mockSaveAll = jest.fn(),
  contacts = []
} = {}) => {
  const mockClient = {
    queryAll: mockQueryAll.mockResolvedValue(contacts),
    saveAll: mockSaveAll
  }

  return mockClient
}

describe('cleanRelatedContactsService', () => {
  it('should update contacts with related contact deleted', async () => {
    const mockSaveAll = jest.fn()
    const contacts = [
      {
        _id: 'contact0',
        relationships: {
          related: { data: [{ _id: 'contactDeletedId' }] }
        }
      },
      {
        _id: 'contact1',
        relationships: {
          related: { data: [] }
        }
      }
    ]
    const client = setup({ mockSaveAll, contacts })

    await cleanRelatedContactsService(client, 'contactDeletedId')

    await waitFor(() => {
      expect(mockSaveAll).toHaveBeenCalledWith([
        {
          _id: 'contact0',
          relationships: {
            related: { data: [] }
          }
        }
      ])
    })
  })

  it('should update contacts with related contact deleted and keep other relations', async () => {
    const mockSaveAll = jest.fn()
    const contacts = [
      {
        _id: 'contact0',
        relationships: {
          related: { data: [{ _id: 'contactDeletedId' }, { _id: 'OtherId' }] }
        }
      },
      {
        _id: 'contact1',
        relationships: {
          related: { data: [] }
        }
      }
    ]
    const client = setup({ mockSaveAll, contacts })

    await cleanRelatedContactsService(client, 'contactDeletedId')

    await waitFor(() => {
      expect(mockSaveAll).toHaveBeenCalledWith([
        {
          _id: 'contact0',
          relationships: {
            related: { data: [{ _id: 'OtherId' }] }
          }
        }
      ])
    })
  })

  it('should not update contacts if no related contact deleted', async () => {
    const mockSaveAll = jest.fn()
    const contacts = [
      {
        _id: 'contact0',
        relationships: {
          related: { data: [{ _id: 'otherId' }] }
        }
      },
      {
        _id: 'contact1',
        relationships: {
          related: { data: [] }
        }
      }
    ]
    const client = setup({ mockSaveAll, contacts })

    await cleanRelatedContactsService(client, 'contactDeletedId')

    await waitFor(() => {
      expect(mockSaveAll).not.toHaveBeenCalled()
    })
  })
})
