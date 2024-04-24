import isEqual from 'lodash/isEqual'

import logger from 'cozy-logger'

import {
  buildTriggersQueryByName,
  buildTriggersQueryById,
  buildContactsQueryByUpdatedAtGT
} from '../queries/queries'

/**
 * Fetches and returns updated contacts according to this :
 * The update date of the contact is more recent than the `date` arg.
 * The method to update contacts is passed as callback
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - The cozy client
 * @param {func} params.log - cozy-logger with its namespace
 * @param {string} params.date - Date of comparison
 * @param {string} params.callback - Function triggered to update contacts
 * @returns {promise<Array>} Updated contacts
 */
export const fetchContactsToUpdateAndUpdateWith = async ({
  client,
  log,
  date,
  callback
}) => {
  try {
    log('info', `will fetch contacts and update them if necessary...`)

    const minimumUpdateTime = date || '0000-01-01T00:00:00.00Z'
    const dateUTCForced = new Date(minimumUpdateTime).toISOString()
    const updatedContacts = []

    log('info', `fetching contacts from ${dateUTCForced}`)

    const contactsQueryByUpdatedAtGT =
      buildContactsQueryByUpdatedAtGT(dateUTCForced)

    const contacts = await client.queryAll(
      contactsQueryByUpdatedAtGT.definition
    )

    const expected = contacts.map(callback)

    contacts.map((contact, index) => {
      const updatedContact = expected[index]

      if (!isEqual(contact, updatedContact)) {
        return updatedContacts.push(updatedContact)
      }
    })

    log(
      'info',
      `among ${contacts.length} contact(s) found, returns ${updatedContacts.length} updated contact(s)`
    )

    return updatedContacts
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
  const log = logger.namespace(`services/${serviceName}`)

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
    log('error', "Can't find:", serviceName, e)
    return null
  }
}
