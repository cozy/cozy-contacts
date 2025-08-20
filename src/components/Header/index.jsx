import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PersonAddIcon from 'cozy-ui/transpiled/react/Icons/PersonAdd'
import { ControlDefault } from 'cozy-ui/transpiled/react/SelectBox'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ImportDropdown from './ImportDropdown'
import SearchInput from './SearchInput'

import { useSearch } from '@/components/Contexts/Search'
import GroupsSelect from '@/components/GroupsSelect/GroupsSelect'
import { useSelectedGroup } from '@/components/GroupsSelect/GroupsSelectProvider'
import { translatedDefaultSelectedGroup } from '@/components/GroupsSelect/helpers'
import { createGroup, updateGroup } from '@/connections/allGroups'

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

const Header = ({ allGroups }) => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { selectedGroup, setSelectedGroup } = useSelectedGroup()
  const { setSearchValue } = useSearch()

  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  )
  const groupsSelectCustomStyles = useGroupsSelectCustomStyles()

  return (
    <div
      className={cx({
        'u-flex u-flex-justify-between': !isMobile
      })}
    >
      <div
        className={cx('u-flex u-flex-items-center u-w-auto-s u-w-5 u-maw-6', {
          'u-mb-1': isMobile,
          'u-mr-1': !isMobile
        })}
      >
        <Button
          className="u-mr-half"
          variant="ghost"
          startIcon={<Icon icon={PersonAddIcon} />}
          label={t('create')}
          fullWidth
          onClick={() => navigate('/new')}
        />
        <ImportDropdown onContactImport={() => navigate('/import')} />
      </div>
      <div
        className={cx({
          'u-flex u-flex-items-center u-flex-justify-end u-flex-grow-1 u-maw-7':
            !isMobile
        })}
      >
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
          onGroupCreate={createGroup}
          onGroupDelete={group =>
            navigate(`/group/${group._id}/delete/${group.name}`)
          }
          onGroupUpdate={updateGroup}
        />
        <SearchInput setSearchValue={setSearchValue} />
      </div>
    </div>
  )
}

Header.propTypes = {
  allGroups: PropTypes.array
}

Header.defaultProps = {
  allGroups: []
}

export default Header
