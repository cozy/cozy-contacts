import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import ClickAwayListener from 'cozy-ui/transpiled/react/ClickAwayListener'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import CustomMenu from './SelectBox/Menu'
import CustomOption from './SelectBox/Option'
import CustomSelectContainer from './SelectBox/SelectContainer'
import useGroupsSelect from './useGroupSelect'

const captureEscapeEvent = e => {
  if (e.key === 'Escape') {
    e.stopPropagation()
    e.target.blur()
  }
}

export const GroupsSelect = ({
  allGroups,
  onGroupCreated,
  onChange,
  closeMenuOnSelect,
  value,
  styles,
  isMulti,
  noOptionsMessage,
  withCheckbox,
  components,
  menuPosition
}) => {
  const client = useClient()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const [{ menuIsOpen, editedGroupId }, setState] = useState({
    menuIsOpen: false,
    editedGroupId: ''
  })
  const { createGroup, renameGroup } = useGroupsSelect({
    allGroups,
    onGroupCreated,
    client
  })

  const toggleMenu = () => {
    setState(prev => ({ ...prev, menuIsOpen: !prev.menuIsOpen }))
  }

  const closeMenu = () => {
    setState(prev => ({ ...prev, menuIsOpen: false }))
  }

  const setEditedGroupId = id => {
    setState(prev => ({ ...prev, editedGroupId: id }))
  }

  const handleChange = props => {
    if (closeMenuOnSelect) {
      closeMenu()
    }

    onChange(props)
  }

  const handleDelete = group => {
    closeMenu()
    navigate(`/group/${group._id}/delete/${group.name}`)
  }

  const defaultComponents = {
    Menu: CustomMenu,
    Option: CustomOption,
    SelectContainer: CustomSelectContainer
  }

  return (
    <>
      <ClickAwayListener onClickAway={menuIsOpen ? closeMenu : () => {}}>
        <SelectBox
          className={isMobile ? 'u-mb-half' : 'u-mr-half'}
          classNamePrefix="react-select"
          isMulti={isMulti}
          withCheckbox={withCheckbox}
          menuIsOpen={menuIsOpen}
          blurInputOnSelect={true}
          hideSelectedOptions={false}
          isSearchable={false}
          isClearable={false}
          closeMenuOnSelect={closeMenuOnSelect}
          tabSelectsValue={false}
          onKeyDown={captureEscapeEvent}
          noOptionsMessage={noOptionsMessage}
          options={allGroups}
          value={value}
          onChange={handleChange}
          getOptionLabel={group => group.name}
          getOptionValue={group => group._id}
          components={{ ...defaultComponents, ...components }}
          createGroup={createGroup}
          deleteGroup={handleDelete}
          renameGroup={renameGroup}
          styles={styles}
          onControlClicked={toggleMenu}
          setEditedGroupId={setEditedGroupId}
          editedGroupId={editedGroupId}
          menuPosition={menuPosition}
          fullwidth
        />
      </ClickAwayListener>
    </>
  )
}

GroupsSelect.propTypes = {
  allGroups: PropTypes.array.isRequired,
  styles: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  // for multiple selections, value can be an array
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  // to customize react-select elements
  components: PropTypes.object,
  // to define if it is possible to select more than one option
  isMulti: PropTypes.bool,
  // noOptionsMessage is used to show a message when there is no options in the menu list
  noOptionsMessage: PropTypes.func,
  // hide/show checkbox besides menu list options
  withCheckbox: PropTypes.bool,
  // function to be triggered after creating a group
  onGroupCreated: PropTypes.func,
  closeMenuOnSelect: PropTypes.bool,
  menuPosition: PropTypes.oneOf(['fixed', 'absolute'])
}

GroupsSelect.defaultProps = {
  isMulti: false,
  components: {},
  closeMenuOnSelect: false
}

GroupsSelect.propTypes = {
  allGroups: PropTypes.array.isRequired
}

export default GroupsSelect
