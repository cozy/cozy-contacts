import { deleteContact } from './allContacts'

describe('', () => {
  let client
  beforeEach(() => {
    client = {
      create: jest.fn(),
      save: jest.fn(),
      destroy: jest.fn()
    }
  })

  it('should delete a contact with no sources', () => {
    const contact = {
      _id: '123',
      cozyMetadata: {
        sync: {}
      }
    }

    deleteContact(client, contact)
    expect(client.destroy).toHaveBeenCalledWith(contact)

    const contactWithoutMetadata = {
      _id: '456'
    }
    deleteContact(client, contactWithoutMetadata)
    expect(client.destroy).toHaveBeenCalledWith(contactWithoutMetadata)
  })

  it('should flag a contact with sources as trashed', () => {
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
    expect(client.destroy).not.toHaveBeenCalled()
    expect(client.save).toHaveBeenCalledWith({
      ...contact,
      trashed: true
    })
  })
})
