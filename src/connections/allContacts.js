import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import uniqWith from 'lodash/uniqWith'

import minilog from 'cozy-minilog'

import {
  getRelatedRelationshipsToUpdate,
  updateRelatedRelationships
} from './relatedRelationships'
import { addGroupToContact } from '../helpers/contacts'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import { hasSelectedGroup } from '../helpers/groups'
import { mergeContact } from '../helpers/mergeContact'
import {
  buildContactsQueryByEmailAdressOrPhoneNumber,
  buildContactsQueryByGroupId,
  buildContactsTrashedQuery
} from '../queries/queries'

const log = minilog('connections/allContacts')

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

export const updateContact = ({ client, contact, attributes }) => {
  const updatedContact = mergeContact(contact, attributes)
  return client.save(updatedContact)
}

const isContactSynced = contact => {
  return Object.keys(contact.cozyMetadata?.sync || {}).length > 0
}

const getGroupRelationshipLength = contact => {
  return contact.relationships?.groups?.data.length
}

/**
 * Delete trashed contacts without linked to an account
 *
 * @param {Object} client - CozyClient
 */
export const deleteTrashedContacts = async client => {
  const contactContactsTrashedQuery = buildContactsTrashedQuery()

  const trashedContacts = await client.queryAll(
    contactContactsTrashedQuery.definition(),
    contactContactsTrashedQuery.options
  )

  const trashedContactsNotLinkedToAccounts = trashedContacts.filter(
    contact => !isContactSynced(contact)
  )

  if (trashedContactsNotLinkedToAccounts.length > 0) {
    const contactCollection = client.collection(DOCTYPE_CONTACTS)
    await contactCollection.destroyAll(trashedContactsNotLinkedToAccounts)
  }
}

/**
 * @param {Object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient
 * @param {import('cozy-client/types/types').ContactDocument} params.oldContact - Is the contact updated
 * @param {Object} params.formData - Contact data
 * @param {Object} params.selectedGroup - Selected group
 * @returns {Promise<import('cozy-client/types/types').IOCozyContact>} - Contact
 */
export const createOrUpdateContact = async ({
  client,
  oldContact,
  formData,
  selectedGroup
}) => {
  let updatedContact = merge({}, formData)

  if (hasSelectedGroup(selectedGroup)) {
    updatedContact = addGroupToContact(updatedContact, selectedGroup)
  }

  const { data: originalContact } = oldContact
    ? await client.save(updatedContact)
    : await client.create(DOCTYPE_CONTACTS, updatedContact)

  const relatedRelationships = getRelatedRelationshipsToUpdate(
    oldContact,
    updatedContact
  )

  if (relatedRelationships) {
    try {
      const relatedContactsToSaved = await updateRelatedRelationships({
        client,
        relatedRelationships,
        originalContactId: originalContact._id
      })

      client.saveAll(relatedContactsToSaved)
    } catch (error) {
      log.error('Error updating related contacts', error)
    }
  }

  return originalContact
}

/**
 * Get contacts by group id
 *
 * @param {Object} client - CozyClient
 * @param {string} groupId - Group id
 * @returns {Promise<Object[]>} - Array of contacts
 */
export const getContactsByGroupId = async (client, groupId) => {
  const contactQueryByGroupId = buildContactsQueryByGroupId(groupId)

  const contacts = await client.queryAll(
    contactQueryByGroupId.definition(),
    contactQueryByGroupId.options
  )

  return contacts
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

/**
 * Cancel trash contacts from a group
 *
 * @param {Object} client - CozyClient
 * @param {String} groupId - Group id
 */
export const cancelTrashContactsByGroupId = async (client, groupId) => {
  const contactQueryByGroupId = buildContactsQueryByGroupId(groupId)
  const contactsTrashed = await client.queryAll(
    contactQueryByGroupId.definition(),
    contactQueryByGroupId.options
  )

  const contacts = contactsTrashed.map(contact => {
    if (getGroupRelationshipLength(contact) === 1) {
      return {
        ...contact,
        trashed: false
      }
    }
    return contact
  })
  await client.saveAll(contacts)
}

/**
 * Update all contacts from a group to trash them
 *
 * @param {Object} client - CozyClient
 * @param {Object[]} groupId - Group id
 */
export const trashedAllContactsByGroupId = async (client, groupId) => {
  const contacts = await getContactsByGroupId(client, groupId)
  const contactsTrashed = contacts.map(contact => {
    if (getGroupRelationshipLength(contact) === 1) {
      return {
        ...contact,
        trashed: true
      }
    }
    return contact
  })

  try {
    if (contactsTrashed.length > 0) {
      const result = await client.saveAll(contactsTrashed)
      return result.data
    }
    log.info('No contacts to trash')
    return []
  } catch (error) {
    log.error('Error saving contact to trash', error)
  }
}
