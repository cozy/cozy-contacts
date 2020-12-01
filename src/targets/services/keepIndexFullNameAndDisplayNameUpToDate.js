import omit from 'lodash/omit'
import CozyClient from 'cozy-client'
import log from 'cozy-logger'

import { schema } from '../../helpers/doctypes'
import {
  fetchContactsToUpdate,
  fetchNormalizedServiceByName
} from '../../helpers/fetches'
import { updateIndexFullNameAndDisplayName } from '../../helpers/contacts'
import fetch from 'node-fetch'

global.fetch = fetch

export const keepIndexFullNameAndDisplayNameUpToDate = async () => {
  log('info', `Executing keepIndexFullNameAndDisplayNameUpToDate service`)
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
  await client.collection('io.cozy.contacts').updateAll(updatedContactsToUpload)
  updatedContactsToUpload.length &&
    log('info', `All contacts successfully updated`)
}

keepIndexFullNameAndDisplayNameUpToDate().catch(e => {
  log('critical', e)
  process.exit(1)
})
