import CozyClient from 'cozy-client'
import manifest from '../../manifest.webapp'
import { schema } from './doctypes'

/**
 * Returns cozy client instance
 * @returns {object} cozy client instance
 */
export const getClient = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.cozyDomain}`

  return new CozyClient({
    uri: cozyUrl,
    token: data.cozyToken,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: false
  })
}
