import get from 'lodash/get'

import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useSelectedGroup } from './GroupsSelectProvider'
import { isExistingGroup } from './helpers'

const useGroupsSelect = ({
  allGroups,
  onGroupCreated,
  client,
  onGroupCreate,
  onGroupUpdate
}) => {
  const { selectedGroup, setSelectedGroup } = useSelectedGroup()
  const { showAlert } = useAlert()
  const { t } = useI18n()

  const createGroupSelf = async group => {
    if (!group.name) return

    if (isExistingGroup(allGroups, group)) {
      return showAlert({
        severity: 'error',
        message: t('groups.already_exists', { name: group.name })
      })
    }

    try {
      const { data: createdGroup } = await onGroupCreate(client, group)
      if (onGroupCreated) {
        onGroupCreated(createdGroup)
      }
      return showAlert({
        severity: 'success',
        message: t('groups.created.success')
      })
    } catch {
      return showAlert({
        severity: 'error',
        message: t('groups.created.error')
      })
    }
  }

  const renameGroupSelf = async (groupId, newName) => {
    const group = allGroups.find(group => group.id === groupId)
    const allOtherGroups = allGroups.filter(group => group.id !== groupId)
    const isRenamedGroupSelected =
      get(group, '_id') === get(selectedGroup, '_id')

    if (isExistingGroup(allOtherGroups, { name: newName })) {
      return showAlert({
        severity: 'error',
        message: t('groups.already_exists', { name: newName })
      })
    }

    try {
      const { data } = await onGroupUpdate(client, { ...group, name: newName })
      if (isRenamedGroupSelected) {
        setSelectedGroup(data)
      }
      return showAlert({
        severity: 'success',
        message: t('groups.renamed.success')
      })
    } catch {
      return showAlert({
        severity: 'error',
        message: t('groups.renamed.error')
      })
    }
  }

  return {
    createGroup: createGroupSelf,
    renameGroup: renameGroupSelf
  }
}

export default useGroupsSelect
