import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'

import { addGroupToContact } from '../helpers/contacts'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import { hasSelectedGroup } from '../helpers/groups'
import { mergeContact } from '../helpers/mergeContact'
import { buildContactsQueryByEmailAdressOrPhoneNumber } from '../queries/queries'

export const importContact = async (client, attributes) => {
  const addresses = (attributes['email'] || []).map(email => email.address)
  const numbers = (attributes['phone'] || []).map(phone => phone.number)

  const contactQueryByEmailAdressOrPhoneNumber =
    buildContactsQueryByEmailAdressOrPhoneNumber(addresses, numbers)

  const { data: contactByEmailAdressOrPhoneNumber } = await client.query(
    contactQueryByEmailAdressOrPhoneNumber.definition
  )

  const contacts = uniqWith(contactByEmailAdressOrPhoneNumber, isEqual)

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

export const createOrUpdateContact = async ({
  client,
  oldContact,
  formData,
  selectedGroup
}) => {
  const createOrUpdate = oldContact ? updateContact : createContact
  let updatedContact = {
    ...oldContact,
    ...formData
  }

  if (hasSelectedGroup(selectedGroup)) {
    updatedContact = addGroupToContact(updatedContact, selectedGroup)
  }

  await createOrUpdate(client, updatedContact)
}

/**
 * Remove a group from all contacts
 *
 * @param {Object} client - CozyClient
 * @param {string} groupId - Group id
 */
export const removeGroupFromAllContacts = async (client, groupId) => {
  const contactQueryByGroupId = buildContactsQueryByGroupId(groupId)

  const contacts = await client.queryAll(
    contactQueryByGroupId.definition(),
    contactQueryByGroupId.options
  )

  const contactsHydrated = client.hydrateDocuments(DOCTYPE_CONTACTS, contacts)

  const groupRemovals = contactsHydrated.map(contact => {
    return contact.groups.removeById(groupId)
  })

  await Promise.all(groupRemovals)
}