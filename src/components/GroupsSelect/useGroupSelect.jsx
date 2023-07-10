import get from 'lodash/get'
import { useContext } from 'react'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

import { createGroup, updateGroup } from '../../connections/allGroups'
import {
  translatedDefaultSelectedGroup,
  isExistingGroup
} from '../../helpers/groups'
import cleanTrashedGroupsAndATrashedContacts from '../../thunks/cleanTrashedGroupsAndATrashedContacts'
import SelectedGroupContext from '../Contexts/SelectedGroup'

const useGroupsSelect = ({ allGroups, onGroupCreated, client, t }) => {
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext)

  const createGroupSelf = async group => {
    if (isExistingGroup(allGroups, group)) {
      return Alerter.error('groups.already_exists', { name: group.name })
    }

    try {
      const { data: createdGroup } = await createGroup(client, group)
      if (onGroupCreated) {
        onGroupCreated(createdGroup)
      }
      return Alerter.success('groups.created.success')
    } catch {
      return Alerter.error('groups.created.error')
    }
  }

  const cancelGroupDelete = async group => {
    delete group.trashed
    await updateGroup(client, group)
    Alerter.info('groups.remove_canceled', { name: group.name })
  }

  const deleteGroupSelf = async group => {
    const isDeletedGroupSelected =
      get(group, '_id') === get(selectedGroup, '_id')
    const { data: flaggedGroup } = await updateGroup(client, {
      ...group,
      trashed: true
    })
    const alertDuration = 3 * 1000

    const alertTimeout = setTimeout(() => {
      cleanTrashedGroupsAndATrashedContacts(client)
    }, alertDuration)

    Alerter.info('groups.removed', {
      name: flaggedGroup.name,
      buttonText: t('cancel'),
      buttonAction: () => {
        clearTimeout(alertTimeout)
        cancelGroupDelete(flaggedGroup)
      },
      duration: alertDuration
    })

    if (isDeletedGroupSelected) {
      setSelectedGroup(translatedDefaultSelectedGroup(t))
    }
  }

  const renameGroupSelf = async (groupId, newName) => {
    const group = allGroups.find(group => group.id === groupId)
    const allOtherGroups = allGroups.filter(group => group.id !== groupId)
    const isRenamedGroupSelected =
      get(group, '_id') === get(selectedGroup, '_id')

    if (isExistingGroup(allOtherGroups, { name: newName })) {
      return Alerter.error('groups.already_exists', { name: newName })
    }

    try {
      const { data } = await updateGroup(client, { ...group, name: newName })
      if (isRenamedGroupSelected) {
        setSelectedGroup(data)
      }
      return Alerter.success('groups.renamed.success')
    } catch {
      return Alerter.error('groups.renamed.error')
    }
  }

  return {
    createGroup: createGroupSelf,
    deleteGroup: deleteGroupSelf,
    renameGroup: renameGroupSelf
  }
}

export default useGroupsSelect
