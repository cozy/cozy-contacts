jest.mock('cozy-client')
import { Q } from 'cozy-client'

import generateCleanTrashedGroupsFn from './cleanTrashedGroups'
import { DOCTYPE_CONTACT_GROUPS, DOCTYPE_CONTACTS } from '../helpers/doctypes'

const mockQ = callback => {
  Q.mockImplementation(doctype => {
    return {
      where: jest.fn().mockReturnValue({
        indexFields: jest.fn().mockReturnValue(callback(doctype))
      }),
      partialIndex: jest.fn().mockReturnValue(callback(doctype))
    }
  })
}

describe('cleaning trashed groups', () => {
  let mockClient,
    mockDispatch,
    mockGetState,
    cleanTrashedGroups,
    mockRemoveGroupById

  beforeEach(() => {
    cleanTrashedGroups = generateCleanTrashedGroupsFn()
    mockRemoveGroupById = jest.fn()

    mockClient = {
      query: jest.fn().mockImplementation(value => value),
      find: jest.fn(),
      hydrateDocuments: jest.fn().mockImplementation((doctype, contacts) =>
        contacts.map(contact => ({
          ...contact,
          groups: {
            removeById: mockRemoveGroupById
          }
        }))
      ),
      destroy: jest.fn().mockReturnValue(Promise.resolve),
      save: jest.fn().mockReturnValue(Promise.resolve)
    }

    mockDispatch = jest.fn()
    mockGetState = jest.fn()
  })

  it('should do nothing when there are no groups to delete', async () => {
    mockQ(() => ({ data: [] }))

    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CLEAN_TRASHED_GROUPS',
      groups: []
    })
    expect(mockClient.destroy).not.toHaveBeenCalled()
  })

  it('should remove trashed groups', async () => {
    const groupsToTrash = [{ _id: '123' }, { _id: '456' }]

    mockQ(doctype => {
      if (doctype === DOCTYPE_CONTACT_GROUPS) return { data: groupsToTrash }
      else if (doctype === DOCTYPE_CONTACTS) return { data: [] }
    })

    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CLEAN_TRASHED_GROUPS',
      groups: groupsToTrash
    })
    for (const groupToTrash of groupsToTrash)
      expect(mockClient.destroy).toHaveBeenCalledWith(groupToTrash)
  })

  it('should remove contacts from trashed groups', async () => {
    const groupToTrash = { _id: '123' }
    const contactToTrash = {
      _id: 'abc',
      relationships: {
        groups: {
          data: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
        }
      }
    }

    mockQ(doctype => {
      if (doctype === DOCTYPE_CONTACT_GROUPS) return { data: [groupToTrash] }
      else if (doctype === DOCTYPE_CONTACTS) return { data: [contactToTrash] }
    })

    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockRemoveGroupById).toHaveBeenCalledWith(groupToTrash._id)
  })

  it('should remove multiple pages of contacts', async () => {
    const groupToTrash = { _id: '123' }
    const contactToTrash1 = {
      _id: 'abc',
      relationships: {
        groups: {
          data: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
        }
      }
    }
    const contactToTrash2 = {
      _id: 'def',
      relationships: {
        groups: {
          data: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
        }
      }
    }

    let isFirstContactPage = true
    mockQ(doctype => {
      if (doctype === DOCTYPE_CONTACT_GROUPS) return { data: [groupToTrash] }
      else if (doctype === DOCTYPE_CONTACTS) {
        const response = {
          data: [isFirstContactPage ? contactToTrash1 : contactToTrash2],
          next: isFirstContactPage
        }
        if (isFirstContactPage) isFirstContactPage = false
        return response
      }
    })

    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockRemoveGroupById).toHaveBeenCalledTimes(2)
    expect(mockRemoveGroupById).toHaveBeenCalledWith(groupToTrash._id)
  })
})
