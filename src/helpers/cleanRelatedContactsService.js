import { Q } from 'cozy-client'
import {
  getHasManyItem,
  removeHasManyItem
} from 'cozy-client/dist/associations/HasMany'
import logger from 'cozy-logger'

import { DOCTYPE_CONTACTS } from '../helpers/doctypes'

const log = logger.namespace('service/cleanRelatedContactsService')
export const cleanRelatedContactsService = async (client, contactDeletedId) => {
  // FIXME: Must be changed when completing the contact relationship functionality.
  const allContacts = await client.queryAll(
    Q(DOCTYPE_CONTACTS)
      .where({
        relationships: {
          related: {
            data: {
              $elemMatch: {
                _id: contactDeletedId,
                _type: DOCTYPE_CONTACTS
              }
            }
          }
        }
      })
      .indexFields(['relationships.related.data'])
      .limitBy(1000)
  )
  log('info', `all contacts fetched, ${allContacts.length} contact(s) found`)

  if (allContacts?.length > 0) {
    const contactsWithRelatedRelDeleted = allContacts.filter(
      contact =>
        getHasManyItem(contact, 'related', contactDeletedId) !== undefined
    )

    log(
      'info',
      `contact ids with related relationships deleted ${contactsWithRelatedRelDeleted
        .map(contact => contact._id)
        .join(', ')}`
    )

    if (contactsWithRelatedRelDeleted.length > 0) {
      log('info', 'updating contacts with related contact deleted')
      const allContactsUpdated = contactsWithRelatedRelDeleted.map(contact =>
        removeHasManyItem(contact, 'related', contactDeletedId)
      )

      log('info', 'saving all contacts updated')
      await client.saveAll(allContactsUpdated)
    }
  }
}
