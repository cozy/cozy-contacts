import { waitFor } from '@testing-library/react'

import {
  deleteTrashedContacts,
  trashedAllContactsByGroupId,
  cancelTrashContactsByGroupId
} from './allContacts'

const setup = ({
  mockDestroyAll = jest.fn(),
  mockDestroy = jest.fn(),
  mockSave = jest.fn(),
  mockSaveAll = jest.fn(),
  contacts = []
} = {}) => {
  const mockClient = {
    create: jest.fn(),
    save: mockSave,
    saveAll: mockSaveAll,
    destroy: mockDestroy,
    query: jest.fn().mockResolvedValue({ data: contacts }),
    queryAll: jest.fn().mockResolvedValue(contacts),
    collection: jest.fn().mockReturnValue({
      destroyAll: mockDestroyAll
    })
  }

  return mockClient
}

describe('allContacts', () => {
  describe('deleteTrashedContacts', () => {
    it('should destroy contact trashed if they have no source', async () => {
      const mockDestroyAll = jest.fn()
      const contacts = [
        {
          _id: 'contact0',
          trashed: true,
          cozyMetadata: {
            sync: {}
          }
        },
        {
          _id: 'contact1',
          trashed: true
        }
      ]
      const client = setup({ mockDestroyAll, contacts })

      await deleteTrashedContacts(client)

      await waitFor(() => {
        expect(mockDestroyAll).toHaveBeenCalledWith([
          { _id: 'contact0', cozyMetadata: { sync: {} }, trashed: true },
          { _id: 'contact1', trashed: true }
        ])
      })
    })

    it('should not destroy contact trashed if they have source', async () => {
      const mockDestroyAll = jest.fn()
      const contacts = [
        {
          _id: 'contact0',
          trashed: true,
          cozyMetadata: {
            sync: {
              456: {
                id: 'people/657623'
              }
            }
          }
        },
        {
          _id: 'contact1',
          trashed: true
        }
      ]
      const client = setup({ mockDestroyAll, contacts })

      await deleteTrashedContacts(client)

      await waitFor(() => {
        expect(mockDestroyAll).toHaveBeenCalledWith([
          { _id: 'contact1', trashed: true }
        ])
      })
    })
  })
  describe('trashedAllContactsByGroupId', () => {
    it('should trash all contacts of a group', async () => {
      const mockSaveAll = jest.fn()
      const contacts = [
        {
          _id: 'contact0',
          relationships: {
            groups: {
              data: [{ _id: 'group0' }]
            }
          }
        },
        {
          _id: 'contact1',
          relationships: {
            groups: {
              data: [{ _id: 'group0' }, { _id: 'group1' }]
            }
          }
        }
      ]
      const client = setup({ mockSaveAll, contacts })

      await trashedAllContactsByGroupId(client, 'group0')

      await waitFor(() => {
        expect(mockSaveAll).toHaveBeenCalledWith([
          {
            _id: 'contact0',
            relationships: { groups: { data: [{ _id: 'group0' }] } },
            trashed: true
          },
          {
            _id: 'contact1',
            relationships: {
              groups: { data: [{ _id: 'group0' }, { _id: 'group1' }] }
            }
          }
        ])
      })
    })
  })
  describe('cancelTrashContactsByGroupId', () => {
    it('should cancel trash all contacts of a group', async () => {
      const mockSaveAll = jest.fn()
      const contacts = [
        {
          _id: 'contact0',
          relationships: {
            groups: {
              data: [{ _id: 'group0' }]
            }
          },
          trashed: true
        },
        {
          _id: 'contact1',
          relationships: {
            groups: {
              data: [{ _id: 'group0' }, { _id: 'group1' }]
            }
          },
          trashed: true
        }
      ]
      const client = setup({ mockSaveAll, contacts })

      await cancelTrashContactsByGroupId(client, 'group0')

      await waitFor(() => {
        expect(mockSaveAll).toHaveBeenCalledWith([
          {
            _id: 'contact0',
            relationships: { groups: { data: [{ _id: 'group0' }] } },
            trashed: false
          },
          {
            _id: 'contact1',
            relationships: {
              groups: { data: [{ _id: 'group0' }, { _id: 'group1' }] }
            },
            trashed: true
          }
        ])
      })
    })
  })
})
