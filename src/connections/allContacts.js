import get from 'lodash/get'

import { mergeContact } from '../helpers/mergeContact'
import { findContactsWithSamePhoneOrEmail } from '../helpers/findContact'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'

export const importContact = async (client, attributes) => {
  const contacts = await findContactsWithSamePhoneOrEmail(attributes)(client)
  if (contacts.length === 1) {
    const updatedContact = mergeContact(contacts[0], attributes)
    return client.save(updatedContact)
  } else if (contacts.length > 1) {
    throw new Error('Too many contacts found with same email or phone number.')
  }
  return client.create(DOCTYPE_CONTACTS, attributes, null)
}

export const createContact = (client, attributes) =>
  client.create(DOCTYPE_CONTACTS, attributes)

export const updateContact = (client, contact) => client.save(contact)

export const deleteContact = (client, contact) => {
  const syncData = get(contact, 'cozyMetadata.sync', {})
  const isLinkedToAccounts = Object.keys(syncData).length > 0
  if (isLinkedToAccounts) {
    return client.save({
      ...contact,
      trashed: true
    })
  } else {
    return client.destroy(contact)
  }
}
