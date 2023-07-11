/* eslint-disable jest/no-focused-tests */
import { waitFor } from '@testing-library/react'

import {
  deleteContact,
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
  describe('deleteContact', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should delete a contact with no sources', () => {
      const mockDestroy = jest.fn()
      const client = setup({ mockDestroy })
      const contact = {
        _id: '123',
        cozyMetadata: {
          sync: {}
        }
      }

      deleteContact(client, contact)
      expect(mockDestroy).toHaveBeenCalledWith(contact)

      const contactWithoutMetadata = {
        _id: '456'
      }
      deleteContact(client, contactWithoutMetadata)
      expect(mockDestroy).toHaveBeenCalledWith(contactWithoutMetadata)
    })

    it('should flag a contact with sources as trashed', () => {
      const mockSave = jest.fn()
      const mockDestroy = jest.fn()
      const client = setup({ mockDestroy, mockSave })
      const contact = {
        _id: '123',
        cozyMetadata: {
          sync: {
            456: {
              id: 'people/657623'
            }
          }
        }
      }

      deleteContact(client, contact)
      expect(mockDestroy).not.toHaveBeenCalled()
      expect(mockSave).toHaveBeenCalledWith({
        ...contact,
        trashed: true
      })
    })
  })
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
