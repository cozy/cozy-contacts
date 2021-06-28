import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker'

import { DOCTYPE_CONTACTS } from './doctypes'

/**
 * Returns the store application url filtered by konnector and Contacts doctype
 * @param {object} client - cozy client
 * @returns {string} Universal link to store application
 */
export const getFilteredStoreUrl = client =>
  generateUniversalLink({
    cozyUrl: client.getStackClient().uri,
    slug: 'store',
    subDomainType: client.getInstanceOptions().subdomain,
    nativePath: `discover/?type=konnector&doctype=${DOCTYPE_CONTACTS}`
  })
