/*
 * This migration script is meant to be used with ACH. It handles the following cases:
 *
 * - ghosts contacts i.e contacts with sources that were deleted since Contacts 0.8.0
 * and the related google connector was uninstalled (connector prior to 2.0.5)
 * - contacts with an empty string in cozy attribute (contacts created with Contacts 0.8.1 with an empty cozy)
 * - old contacts with a string in cozy or email attributes
*/
const get = require('lodash/get')

const { mkAPI, utils } = require('cozy-ach')

const DOCTYPE_CONTACTS = 'io.cozy.contacts'
const DOCTYPE_CONTACTS_ACCOUNT = 'io.cozy.contacts.accounts'

function fixCozy(contact) {
  if (contact.cozy === '') {
    const fixedContact = {
      ...contact,
      cozy: []
    }

    return {
      contact: fixedContact,
      cozyFixed: false,
      emptyCozyFixed: true
    }
  } else if (typeof contact.cozy === 'string') {
    const fixedContact = {
      ...contact,
      cozy: [
        {
          url: contact.cozy,
          primary: true
        }
      ]
    }

    return {
      contact: fixedContact,
      cozyFixed: true,
      emptyCozyFixed: false
    }
  }

  return {
    contact,
    cozyFixed: false,
    emptyCozyFixed: false
  }
}

function fixEmail(contact) {
  if (typeof contact.email === 'string') {
    const fixedContact = {
      ...contact,
      email: [
        {
          address: contact.email,
          primary: true
        }
      ]
    }

    return {
      contact: fixedContact,
      emailFixed: true
    }
  }

  return {
    contact,
    emailFixed: false
  }
}

function shouldDeleteContact(contact, contactsAccounts) {
  if (get(contact, 'trashed', false)) {
    if (get(contact, 'relationships.accounts.data', []).length > 0) {
      const contactAccountId = contact.relationships.accounts.data[0]._id
      // get contact account
      const contactAccount = contactsAccounts.find(
        account => account._id === contactAccountId
      )

      return contactAccount.sourceAccount === null
    }
  }

  return false
}

async function doMigrations(dryRun, api, logWithInstance) {
  const contacts = await api.fetchAll(DOCTYPE_CONTACTS)
  if (contacts.length === 0) {
    logWithInstance('No contacts, nothing to migrate')
    return
  }

  const contactsAccounts = await api.fetchAll(DOCTYPE_CONTACTS_ACCOUNT)
  const result = {
    cozy: 0,
    cozyEmpty: 0,
    email: 0
  }

  const fixedContacts = contacts
    .map(contact => {
      const cozyResult = fixCozy(contact)
      if (cozyResult.cozyFixed) result.cozy++
      if (cozyResult.emptyCozyFixed) result.cozyEmpty++
      const { emailFixed, contact: fixedContact } = fixEmail(cozyResult.contact)
      if (emailFixed) result.email++

      if (cozyResult.cozyFixed || cozyResult.emptyCozyFixed || emailFixed) {
        return fixedContact
      }

      return undefined
    })
    .filter(c => c !== undefined)

  const ghosts = contacts.filter(contact =>
    shouldDeleteContact(contact, contactsAccounts)
  )

  if (dryRun) {
    logWithInstance(
      `Would process ${contacts.length} contacts: \n` +
        `[cozy]: ${result.cozy} would be fixed.\n` +
        `[empty cozy]: ${result.cozyEmpty} would be fixed.\n` +
        `[email]: ${result.email} would be fixed.\n` +
        `[ghosts]: ${ghosts.length} would be deleted.`
    )
  } else {
    await api.deleteAll(DOCTYPE_CONTACTS, ghosts)
    await api.updateAll(DOCTYPE_CONTACTS, fixedContacts)
    logWithInstance(
      `Processed ${contacts.length} contacts: \n` +
        `[cozy]: ${result.cozy} fixed.\n` +
        `[empty cozy]: ${result.cozyEmpty} fixed.\n` +
        `[email]: ${result.email} fixed.\n` +
        `[ghosts]: ${ghosts.length} deleted.`
    )
  }
}

module.exports = {
  fixCozy,
  fixEmail,
  shouldDeleteContact,
  getDoctypes: function() {
    return [DOCTYPE_CONTACTS, DOCTYPE_CONTACTS_ACCOUNT]
  },
  run: async function(ach, dryRun = true) {
    const api = mkAPI(ach.client)
    const logWithInstance = utils.getWithInstanceLogger(ach.client)
    try {
      await doMigrations(dryRun, api, logWithInstance)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(ach.url, err)
    }
  }
}
