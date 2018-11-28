import generateCleanTrashedGroupsFn from './cleanTrashedGroups'
import { DOCTYPE_CONTACT_GROUPS, DOCTYPE_CONTACTS } from '../helpers/doctypes'

const mockFindResponses = callback => doctype => {
  return {
    where: jest.fn().mockReturnValue(callback(doctype))
  }
}

describe('cleaning trashed groups', () => {
  let mockClient, mockDispatch, mockGetState, cleanTrashedGroups

  beforeEach(() => {
    cleanTrashedGroups = generateCleanTrashedGroupsFn()

    mockClient = {
      query: jest.fn().mockImplementation(value => value),
      find: jest.fn(),
      destroy: jest.fn().mockReturnValue(Promise.resolve),
      save: jest.fn().mockReturnValue(Promise.resolve)
    }

    mockDispatch = jest.fn()
    mockGetState = jest.fn()
  })

  it('should do nothing when there are no groups to delete', async () => {
    mockClient.find.mockImplementation(mockFindResponses(() => ({ data: [] })))
    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CLEAN_TRASHED_GROUPS',
      groups: []
    })
    expect(mockClient.destroy).not.toHaveBeenCalled()
  })

  it('should remove trashed groups', async () => {
    const groupsToTrash = [{ _id: '123' }, { _id: '456' }]

    mockClient.find.mockImplementation(
      mockFindResponses(doctype => {
        if (doctype === DOCTYPE_CONTACT_GROUPS) return { data: groupsToTrash }
        else if (doctype === DOCTYPE_CONTACTS) return { data: [] }
      })
    )
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
      groups: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
    }

    mockClient.find.mockImplementation(
      mockFindResponses(doctype => {
        if (doctype === DOCTYPE_CONTACT_GROUPS) return { data: [groupToTrash] }
        else if (doctype === DOCTYPE_CONTACTS) return { data: [contactToTrash] }
      })
    )
    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockClient.save).toHaveBeenCalledWith({
      _id: contactToTrash._id,
      groups: [{ _id: 'dont remove me' }]
    })
  })

  it('should remove multiple pages of contacts', async () => {
    const groupToTrash = { _id: '123' }
    const contactToTrash1 = {
      _id: 'abc',
      groups: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
    }
    const contactToTrash2 = {
      _id: 'def',
      groups: [{ _id: groupToTrash._id }, { _id: 'dont remove me' }]
    }

    let isFirstContactPage = true
    mockClient.find.mockImplementation(
      mockFindResponses(doctype => {
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
    )

    await cleanTrashedGroups(mockDispatch, mockGetState, { client: mockClient })

    expect(mockClient.save).toHaveBeenCalledTimes(2)
    expect(mockClient.save).toHaveBeenCalledWith({
      _id: contactToTrash1._id,
      groups: [{ _id: 'dont remove me' }]
    })
    expect(mockClient.save).toHaveBeenCalledWith({
      _id: contactToTrash2._id,
      groups: [{ _id: 'dont remove me' }]
    })
  })
})
