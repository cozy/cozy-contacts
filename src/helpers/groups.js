export const isExistingGroup = (groupsAlreadyCreated, groupToCreate) => {
  const isNameAlreadyUsed =
    groupsAlreadyCreated.find(
      group => group.name.toLowerCase() === groupToCreate.name.toLowerCase()
    ) !== undefined

  return isNameAlreadyUsed
}
