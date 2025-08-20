import React from 'react'

import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import GroupsSelect from '@/components/GroupsSelect/GroupsSelect'
import { useSelectedGroup } from '@/components/GroupsSelect/GroupsSelectProvider'
import { translatedDefaultSelectedGroup } from '@/components/GroupsSelect/helpers'

const setGroupsSelectOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups

const useGroupsSelectCustomStyles = () => {
  const { isMobile } = useBreakpoints()

  return {
    container: base => ({
      ...base,
      width: isMobile ? '100%' : '50%'
    }),
    noOptionsMessage: base => ({ ...base, textAlign: 'left' })
  }
}

const ControlDefaultWithTestId = ({ ...props }) => {
  return (
    <ControlDefault
      {...props}
      innerProps={{
        ...props.innerProps,
        'data-testid': 'selectBox-controlDefault',
        className: 'u-bdrs-4'
      }}
    />
  )
}

const GroupsSelection = ({
  allGroups,
  onGroupCreate,
  onGroupUpdate,
  onGroupDelete
}) => {
  const { t } = useI18n()
  const { selectedGroup, setSelectedGroup } = useSelectedGroup()

  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )

  const groupsSelectCustomStyles = useGroupsSelectCustomStyles()

  return (
    <GroupsSelect
      allGroups={groupsSelectOptions}
      value={selectedGroup}
      noOptionsMessage={() => t('filter.no-group')}
      styles={groupsSelectCustomStyles}
      closeMenuOnSelect={true}
      components={{
        Control: ControlDefaultWithTestId
      }}
      onChange={setSelectedGroup}
      onGroupCreate={onGroupCreate}
      onGroupUpdate={onGroupUpdate}
      onGroupDelete={onGroupDelete}
    />
  )
}

export default GroupsSelection
