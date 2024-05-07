export const DOCTYPE_CONTACTS = 'io.cozy.contacts'
export const DOCTYPE_CONTACTS_VERSION = 3
export const DOCTYPE_CONTACT_GROUPS = 'io.cozy.contacts.groups'
export const DOCTYPE_CONTACT_ACCOUNTS = 'io.cozy.contacts.accounts'
export const DOCTYPE_TRIGGERS = 'io.cozy.triggers'
export const DOCTYPE_IDENTITIES = 'io.cozy.identities'

// TODO Export to Cozy-client when https://github.com/cozy/cozy-client/pull/1470 merges.
export const relatedContactTypes = [
  'acquaintance',
  'agent',
  'child',
  'colleague',
  'coResident',
  'coWorker',
  'friend',
  'parent',
  'sibling',
  'spouse',
  'related'
]

const relatedRelationships = relatedContactTypes.reduce((acc, type) => {
  acc[type] = {
    type: 'has-many',
    doctype: DOCTYPE_CONTACTS
  }
  return acc
}, {})

export const schema = {
  contacts: {
    doctype: DOCTYPE_CONTACTS,
    doctypeVersion: DOCTYPE_CONTACTS_VERSION,
    relationships: {
      groups: {
        type: 'has-many',
        doctype: DOCTYPE_CONTACT_GROUPS
      },
      accounts: {
        type: 'has-many',
        doctype: DOCTYPE_CONTACT_ACCOUNTS
      },
      ...relatedRelationships
    }
  },
  groups: { doctype: DOCTYPE_CONTACT_GROUPS }
}
