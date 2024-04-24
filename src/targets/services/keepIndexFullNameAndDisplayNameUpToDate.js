import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import { updateIndexFullNameAndDisplayName } from '../../helpers/contacts'
import { schema, DOCTYPE_CONTACTS } from '../../helpers/doctypes'
import {
  fetchContactsToUpdateAndUpdateWith,
  fetchNormalizedServiceByName
} from '../../helpers/fetches'

global.fetch = fetch
const log = logger.namespace('services/keepIndexFullNameAndDisplayNameUpToDate')

export const keepIndexFullNameAndDisplayNameUpToDate = async () => {
  log('info', `Executing keepIndexFullNameAndDisplayNameUpToDate service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const normalizedService = await fetchNormalizedServiceByName(
    client,
    'keepIndexFullNameAndDisplayNameUpToDate'
  )

  const updatedContactsToUpload = await fetchContactsToUpdateAndUpdateWith({
    client,
    log,
    date: normalizedService?.current_state?.last_success,
    callback: contact => updateIndexFullNameAndDisplayName(contact)
  })

  if (updatedContactsToUpload?.length > 0) {
    await client.collection(DOCTYPE_CONTACTS).updateAll(updatedContactsToUpload)

    log('info', 'All contacts successfully updated')
  }
}

keepIndexFullNameAndDisplayNameUpToDate().catch(e => {
  log('error', e)
  process.exit(1)
})
