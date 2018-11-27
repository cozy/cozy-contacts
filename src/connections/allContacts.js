import { withMutations } from 'cozy-client'
import { mergeContact } from '../helpers/mergeContact'
import { findContactsWithSamePhoneOrEmail } from '../helpers/findContact'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'

const withContactsMutations = withMutations(client => ({
  importContact: async attributes => {
    const contacts = await findContactsWithSamePhoneOrEmail(attributes)(client)
    if (contacts.length === 1) {
      const updatedContact = mergeContact(contacts[0], attributes)
      return client.save(updatedContact)
    } else if (contacts.length > 1) {
      throw new Error(
        'Too many contacts found with same email or phone number.'
      )
    }
    return client.create(DOCTYPE_CONTACTS, attributes, null)
  },
  createContact: attributes => client.create(DOCTYPE_CONTACTS, attributes),
  updateContact: contact => client.save(contact),
  deleteContact: contact => client.destroy(contact)
}))

export default withContactsMutations
