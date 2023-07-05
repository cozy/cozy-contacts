import isEqual from 'lodash/isEqual'

import log from 'cozy-logger'

import { updateIndexFullNameAndDisplayName } from './contacts'
import {
  buildTriggersQueryByName,
  buildTriggersQueryById,
  buildContactsQueryByUpdatedAtGT
} from '../queries/queries'

/**
 * Fetches and returns a promise of contacts to update according to this :
 * The update date of the contact is more recent than the 'date'
 * @param {object} client - cozyClient
 * @param {string} date - date of comparison
 * @returns {promise<Array>} contacts to update
 */
export const fetchContactsToUpdate = async (client, date) => {
  try {
    const minimumUpdateTime = date || '0000-01-01T00:00:00.00Z'
    const dateUTCForced = new Date(minimumUpdateTime).toISOString()
    const contacts = []

    const contactsQueryByUpdatedAtGT =
      buildContactsQueryByUpdatedAtGT(dateUTCForced)

    const result = await client.queryAll(contactsQueryByUpdatedAtGT.definition)
    const expected = result.map(contact =>
      updateIndexFullNameAndDisplayName(contact)
    )
    result.map((contact, index) => {
      if (!isEqual(contact, expected[index])) return contacts.push(contact)
    })

    log('info', `found ${contacts.length} contact(s) to update`)

    return contacts
  } catch (e) {
    throw new Error(`Can't find elements : ${e}`)
  }
}

/**
 * Fetches and returns a promise of normalized service
 * @param {object} client - cozyClient
 * @param {string} serviceName - name of the service
 * @returns {promise<Object>} normalized service
 */
export const fetchNormalizedServiceByName = async (client, serviceName) => {
  try {
    const triggersQueryByName = buildTriggersQueryByName(serviceName)
    const triggersByName = await client.query(triggersQueryByName.definition)

    if (!triggersByName || 0 === triggersByName.data.length) {
      throw new Error('service is not available')
    }

    const triggersQueryById = buildTriggersQueryById(triggersByName.data[0].id)
    const normalizedTrigger = await client.query(triggersQueryById.definition)

    if (!normalizedTrigger) {
      throw new Error('normalized service is not available')
    }

    return normalizedTrigger.data
  } catch (e) {
    log('error', `Can't find ${serviceName}: ${e}`)
    return null
  }
}
