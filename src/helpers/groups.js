import differenceBy from 'lodash/differenceBy'

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
