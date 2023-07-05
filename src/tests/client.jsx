import CozyClient from 'cozy-client'

import { DOCTYPE_CONTACTS, DOCTYPE_CONTACT_GROUPS } from '../helpers/doctypes'

const defaultOptions = {
  uri: 'http://cozy.works:8080',
  token: 'MyOwnToken'
}

export const getCozyClient = ({ uri, token } = defaultOptions) => {
  const clientTest = new CozyClient({
    schema: {
      contacts: {
        doctype: DOCTYPE_CONTACTS,
        relationships: {
          groups: {
            type: 'has-many',
            doctype: DOCTYPE_CONTACT_GROUPS
          }
        }
      },
      groups: { doctype: DOCTYPE_CONTACT_GROUPS }
    },
    uri,
    token,
    store: false
  })

  return clientTest
}

export default getCozyClient
