import log from 'cozy-logger'
import { isEqual } from 'lodash'
import { DOCTYPE_CONTACTS } from './doctypes'
import { updateIndexFullNameAndDisplayName } from './contacts'

/**
 * Fetches and returns a promise of contacts to update according to this :
 * The update date of the contact is more recent than the 'date'
 * @param {object} client - cozyClient
 * @param {string} date - date of comparison
 * @returns {promise<Array>} contacts to update
 */
export const fetchContactsToUpdate = async (client, date) => {
  try {
    const dateUTCForced = new Date(date).toISOString()
    const contacts = []

    const queryDef = client
      .find(DOCTYPE_CONTACTS)
      .where({
        trashed: {
          $exists: false
        },
        $or: [
          {
            cozyMetadata: { $exists: false }
          },
          {
            'cozyMetadata.updatedAt': { $gt: dateUTCForced }
          }
        ]
      })
      .indexFields(['_id'])
      .limitBy(1000)

    const result = await client.queryAll(queryDef)
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
    const triggersByName = await client.query(
      client.find('io.cozy.triggers', {
        'message.name': serviceName
      })
    )

    const normalizedTrigger = await client.query(
      client.get('io.cozy.triggers', triggersByName.data[0].id)
    )

    return normalizedTrigger.data
  } catch (e) {
    throw new Error(`Can't find ${serviceName} : ${e}`)
  }
}
