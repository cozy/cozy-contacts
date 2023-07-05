import CozyClient from 'cozy-client'

import { schema } from './doctypes'
import manifest from '../../manifest.webapp'

/**
 * Returns cozy client instance
 * @returns {object} cozy client instance
 */
export const getClient = () => {
  const container = document.querySelector('[role=application]')
  const data = JSON.parse(container.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  return new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: false
  })
}
