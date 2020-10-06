import { updateContactGroups, filterContactsByGroup } from './groups'

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

  it('should filter contacts by group', () => {
    const contacts = [
      {
        _id: '01',
        relationships: { groups: { data: [{ _id: 'groupID_01' }] } }
      },
      { _id: '02' },
      { _id: '03', relationships: { other: {} } },
      {
        _id: '04',
        relationships: { groups: { data: [{ _id: 'groupID_02' }] } }
      }
    ]
    const selectedGroup = { _id: 'groupID_01' }

    const filteredContacts = filterContactsByGroup(contacts, selectedGroup)
    expect(filteredContacts.length).toBe(1)
    expect(filteredContacts[0]._id).toBe('01')
  })
})
