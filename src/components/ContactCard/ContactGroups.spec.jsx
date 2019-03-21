import { ContactGroupsClass } from './ContactGroups'
describe('ContactGroups', () => {
  describe('Updating groups', () => {
    let mockContact, component
    beforeEach(() => {
      mockContact = {
        groups: {
          data: [{ _id: 1 }],
          addById: jest.fn(),
          removeById: jest.fn()
        }
      }

      component = new ContactGroupsClass({
        contact: mockContact
      })
    })

    it('should add groups', () => {
      const component = new ContactGroupsClass({
        contact: mockContact
      })
      component.updateContactGroups([{ _id: 1 }, { _id: 2 }])
      expect(mockContact.groups.addById).toHaveBeenCalledWith([2])
      component.updateContactGroups([{ _id: 3 }, { _id: 4 }])
      expect(mockContact.groups.addById).toHaveBeenCalledWith([3, 4])
    })

    it('should remove groups', () => {
      component.updateContactGroups([])
      expect(mockContact.groups.removeById).toHaveBeenCalledWith([1])
    })
  })
})
