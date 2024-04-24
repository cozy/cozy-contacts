import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import { updateContactAttributes } from '../../helpers/autoDefineLabelsService'
import { schema } from '../../helpers/doctypes'
import {
  fetchContactsToUpdateAndUpdateWith,
  fetchNormalizedServiceByName
} from '../../helpers/fetches'

const log = logger.namespace('services/autoDefineLabels')

global.fetch = fetch

const autoDefineLabels = async () => {
  log('info', 'Start autoDefineLabels service')
  const client = CozyClient.fromEnv(process.env, { schema })

  const normalizedService = await fetchNormalizedServiceByName(
    client,
    'autoDefineLabels'
  )

  const updatedContactsToUpload = await fetchContactsToUpdateAndUpdateWith({
    client,
    log,
    date: normalizedService?.current_state?.last_success,
    callback: contact => updateContactAttributes(contact)
  })

  if (updatedContactsToUpload?.length > 0) {
    await client.saveAll(updatedContactsToUpload)

    log('info', 'All contacts successfully updated')
  }
}

autoDefineLabels().catch(e => {
  log('error', e)
  process.exit(1)
})
