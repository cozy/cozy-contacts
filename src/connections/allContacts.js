import { connect, withMutations } from 'cozy-client'
import flow from 'lodash/flow'
import { mergeContact } from '../helpers/mergeContact'
import { findContactsWithSamePhoneOrEmail } from '../helpers/findContact'

const CONNECTION_NAME = 'allContacts'

export const withContacts = connect(
  client => client.all('io.cozy.contacts').UNSAFE_noLimit(),
  {
    as: CONNECTION_NAME
  }
)

export const withContactsMutations = withMutations(client => ({
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
    return client.create('io.cozy.contacts', attributes, null)
  },
  createContact: attributes =>
    client.create('io.cozy.contacts', attributes, null, {
      updateQueries: {
        [CONNECTION_NAME]: (previousData, result) => [
          ...previousData,
          result.data
        ]
      }
    }),
  updateContact: contact => client.save(contact),
  deleteContact: contact => client.destroy(contact)
}))

export default flow([withContacts, withContactsMutations])
