import differenceBy from 'lodash/differenceBy'
import filter from 'lodash/filter'
import get from 'lodash/get'

export const isExistingGroup = (groupsAlreadyCreated, groupToCreate) => {
  const isNameAlreadyUsed =
    groupsAlreadyCreated.find(
      group => group.name.toLowerCase() === groupToCreate.name.toLowerCase()
    ) !== undefined

  return isNameAlreadyUsed
}

export const updateContactGroups = (contact, nextGroups) => {
  const currentGroups = contact.groups.data
  const toAdd = differenceBy(nextGroups, currentGroups, '_id')
  const toRemove = differenceBy(currentGroups, nextGroups, '_id')

  if (toAdd.length > 0) contact.groups.addById(toAdd.map(({ _id }) => _id))
  else if (toRemove.length > 0)
    contact.groups.removeById(toRemove.map(({ _id }) => _id))
  // we can't do both at the same time right now, see https://github.com/cozy/cozy-client/issues/358
}

/**
 * Filter contacts by group
 * @param {array} contacts - Array of io.cozy.contact documents
 * @param {object} selectedGroup - Group to filter on
 * @returns Array of filtered contacts
 */
export const filterContactsByGroup = (contacts, selectedGroup) => {
  const filterRule = contact =>
    get(contact, 'relationships.groups.data', []).find(
      group => group._id === selectedGroup._id
    )

  const filteredContacts = filter(contacts, filterRule)
  return filteredContacts
}

export const addGroupToContact = async (contact, createdGroup) => {
  await contact.groups.addById(createdGroup.data._id)
}
