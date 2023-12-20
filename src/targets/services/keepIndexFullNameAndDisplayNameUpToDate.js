import omit from 'lodash/omit'
import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import minilog from 'cozy-minilog'

import { updateIndexFullNameAndDisplayName } from '../../helpers/contacts'
import { schema, DOCTYPE_CONTACTS } from '../../helpers/doctypes'
import {
  fetchContactsToUpdate,
  fetchNormalizedServiceByName
} from '../../helpers/fetches'

global.fetch = fetch
const log = minilog('services/keepIndexFullNameAndDisplayNameUpToDate')

export const keepIndexFullNameAndDisplayNameUpToDate = async () => {
  log.info(`Executing keepIndexFullNameAndDisplayNameUpToDate service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const normalizedService = await fetchNormalizedServiceByName(
    client,
    'keepIndexFullNameAndDisplayNameUpToDate'
  )
  const contactsToUpdate = await fetchContactsToUpdate(
    client,
    normalizedService.current_state.last_success
  )
  const updatedContactsToUpload = contactsToUpdate.map(
    // omit is to prevent updateAll error : Bad special document member: _type
    // issue here : https://github.com/cozy/cozy-client/issues/758
    // to be removed when issue is fixed
    contact => updateIndexFullNameAndDisplayName(omit(contact, '_type'))
  )
  await client.collection(DOCTYPE_CONTACTS).updateAll(updatedContactsToUpload)
  updatedContactsToUpload.length &&
    log.info('All contacts successfully updated')
}

keepIndexFullNameAndDisplayNameUpToDate().catch(e => {
  log.error(e)
  process.exit(1)
})
