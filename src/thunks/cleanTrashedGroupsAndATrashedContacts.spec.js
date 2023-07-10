import { waitFor } from '@testing-library/react'

import cleanTrashedGroupsAndATrashedContacts from './cleanTrashedGroupsAndATrashedContacts'
import {
  deleteTrashedContacts,
  removeGroupFromAllContacts
} from '../connections/allContacts'
import { deleteGroupById } from '../connections/allGroups'

jest.mock('../connections/allContacts', () => ({
  ...jest.requireActual('../connections/allContacts'),
  deleteTrashedContacts: jest.fn(),
  removeGroupFromAllContacts: jest.fn()
}))
jest.mock('../connections/allGroups', () => ({
  ...jest.requireActual('../connections/allGroups'),
  deleteGroupById: jest.fn()
}))

const setup = ({ groups = [] } = {}) => {
  const mockClient = {
    query: jest.fn().mockResolvedValue({ data: groups })
  }

  return mockClient
}

describe('cleanTrashedGroupsAndATrashedContacts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should remove trashed groups and trashed contacts', async () => {
    const mockClient = setup({ groups: [{ _id: 'group_1' }] })
    cleanTrashedGroupsAndATrashedContacts(mockClient)

    await waitFor(() => {
      expect(removeGroupFromAllContacts).toBeCalledTimes(1)
      expect(deleteGroupById).toBeCalledTimes(1)
      expect(deleteTrashedContacts).toBeCalledTimes(1)
    })
  })
  it('should remove trashed contacts when there are no trashed groups', async () => {
    const mockClient = setup({ groups: [] })
    cleanTrashedGroupsAndATrashedContacts(mockClient)

    await waitFor(() => {
      expect(removeGroupFromAllContacts).not.toBeCalled()
      expect(deleteGroupById).not.toBeCalled()
      expect(deleteTrashedContacts).toBeCalledTimes(1)
    })
  })
})
