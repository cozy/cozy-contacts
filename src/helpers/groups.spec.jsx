import { updateContactGroups } from './groups'

describe('groups', () => {
  let mockContact
  beforeEach(() => {
    mockContact = {
      groups: {
        data: [{ _id: 1 }],
        addById: jest.fn(),
        removeById: jest.fn()
      }
    }
  })

  it('should add groups', () => {
    updateContactGroups(mockContact, [{ _id: 1 }, { _id: 2 }])
    expect(mockContact.groups.addById).toHaveBeenCalledWith([2])

    updateContactGroups(mockContact, [{ _id: 3 }, { _id: 4 }])
    expect(mockContact.groups.addById).toHaveBeenCalledWith([3, 4])
  })

  it('should remove groups', () => {
    updateContactGroups(mockContact, [])
    expect(mockContact.groups.removeById).toHaveBeenCalledWith([1])
  })
})
