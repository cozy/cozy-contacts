import CozyClient from 'cozy-client'

const defaultOptions = {
  uri: 'http://cozy.works:8080',
  token: 'MyOwnToken'
}

export const getCozyClient = ({ uri, token } = defaultOptions) => {
  const clientTest = new CozyClient({
    schema: {
      contacts: {
        doctype: 'io.cozy.contacts',
        relationships: {
          groups: {
            type: 'has-many',
            doctype: 'io.cozy.contacts.groups'
          }
        }
      },
      groups: { doctype: 'io.cozy.contacts.groups' }
    },
    uri,
    token
  })

  return clientTest
}

export default getCozyClient
