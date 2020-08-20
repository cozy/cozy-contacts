import CozyClient from 'cozy-client'
import manifest from '../../manifest.webapp'
import { schema } from './doctypes'

/**
 * Returns URI of the application
 * @returns {string} application's URI
 */
const getCozyURI = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol

  return `${protocol}//${data.cozyDomain}`
}

/**
 * Returns token of the application
 * @returns {string} application's token
 */
const getToken = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  return data.cozyToken
}

/**
 * Returns cozy client instance
 * @returns {object} cozy client instance
 */
export const getClient = () => {
  const uri = getCozyURI()
  const token = getToken()

  return new CozyClient({
    uri,
    token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema
  })
}
