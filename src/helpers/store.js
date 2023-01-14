import { generateWebLink } from 'cozy-client'

import { DOCTYPE_CONTACTS } from './doctypes'

/**
 * Returns the store application url filtered by konnector and Contacts doctype
 *
 * @param {object} client - cozy client
 * @returns {string} Universal link to store application
 */
export const getFilteredStoreUrl = client =>
  generateWebLink({
    cozyUrl: client.getStackClient().uri,
    hash: `discover/?type=konnector&doctype=${DOCTYPE_CONTACTS}`,
    pathname: '/',
    slug: 'store',
    subDomainType: client.getInstanceOptions().subdomain
  })
