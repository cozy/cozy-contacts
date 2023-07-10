/* eslint-disable jest/no-focused-tests */
import { waitFor } from '@testing-library/react'

import {
  cancelTrashGroupById,
  deleteGroupById,
  trashedGroupById
} from './allGroups'

const setup = ({
  mockDestroy = jest.fn(),
  mockSave = jest.fn(),
  group = {}
} = {}) => {
  const mockClient = {
    create: jest.fn(),
    save: mockSave,
    destroy: mockDestroy,
    query: jest.fn().mockResolvedValue({ data: group })
  }

  return mockClient
}

describe('allGroups', () => {
  describe('deleteGroupById', () => {
    it('should delete a contact with no sources', async () => {
      const mockDestroy = jest.fn()
      const group = {
        _id: 'group0',
        trashed: true
      }
      const client = setup({ mockDestroy, group })

      await deleteGroupById(client, group)

      await waitFor(() => {
        expect(mockDestroy).toHaveBeenCalledWith(group)
      })
    })
  })
  describe('trashedGroupById', () => {
    it('should trash group', async () => {
      const group = { _id: 'group0' }
      const mockSave = jest
        .fn()
        .mockResolvedValue({ data: { ...group, trashed: true } })

      const client = setup({ mockSave, group })

      await trashedGroupById(client, 'group0')

      await waitFor(() => {
        expect(mockSave).toHaveBeenCalledWith({ _id: 'group0', trashed: true })
      })
    })
  })
  describe('cancelTrashGroupById', () => {
    it('should cancel trash a group', async () => {
      const mockSave = jest.fn()
      const group = { _id: 'group0', trashed: true }
      const client = setup({ mockSave, group })

      await cancelTrashGroupById(client, 'group0')

      await waitFor(() => {
        expect(mockSave).toHaveBeenCalledWith({ _id: 'group0', trashed: false })
      })
    })
  })
})
