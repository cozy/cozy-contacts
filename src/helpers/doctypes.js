export const DOCTYPE_CONTACTS = 'io.cozy.contacts'
export const DOCTYPE_CONTACTS_VERSION = 3
export const DOCTYPE_CONTACT_GROUPS = 'io.cozy.contacts.groups'
export const DOCTYPE_CONTACT_ACCOUNTS = 'io.cozy.contacts.accounts'
export const DOCTYPE_TRIGGERS = 'io.cozy.triggers'
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
      }
    }
  },
  groups: { doctype: DOCTYPE_CONTACT_GROUPS }
}
