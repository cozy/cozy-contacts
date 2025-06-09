import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import { schema } from '../../helpers/doctypes'

import { cleanRelatedContactsService } from '@/helpers/cleanRelatedContactsService'

const log = logger.namespace('services/cleanRelatedContacts')

global.fetch = fetch

const cleanRelatedContacts = async () => {
  log('info', 'Start cleanRelatedContacts service')
  const client = CozyClient.fromEnv(process.env, { schema })
  const contactDeleted = JSON.parse(process.env.COZY_COUCH_DOC)

  await cleanRelatedContactsService(client, contactDeleted._id)

  log('info', 'All contacts successfully updated')
}

cleanRelatedContacts().catch(e => {
  log('error', e)
  process.exit(1)
})
