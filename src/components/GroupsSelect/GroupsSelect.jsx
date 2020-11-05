import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'
import get from 'lodash/get'
import cx from 'classnames'

import { withClient } from 'cozy-client'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Overlay from 'cozy-ui/transpiled/react/Overlay'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

import SelectedGroupContext from '../Contexts/SelectedGroup'
import { createGroup, updateGroup } from '../../connections/allGroups'
import {
  translatedDefaultSelectedGroup,
  isExistingGroup
} from '../../helpers/groups'
import container from '../ContactCard/ContactGroupsContainer'

import CustomMenu from './SelectBox/Menu'
import CustomOption from './SelectBox/Option'
import CustomSelectContainer from './SelectBox/SelectContainer'

const captureEscapeEvent = e => {
  if (e.key === 'Escape') {
    e.stopPropagation()
    e.target.blur()
  }
}
export class GroupsSelectClass extends React.Component {
  static contextType = SelectedGroupContext
  state = {
    menuIsOpen: false,
    editedGroupId: ''
  }

  toggleMenu = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false })
  }

  setEditedGroupId = id => this.setState({ editedGroupId: id })

  createGroup = async group => {
    const { allGroups, onGroupCreated, client } = this.props

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

  deleteGroup = async group => {
    const { t, cleanTrashedGroups, client } = this.props
    const { selectedGroup, setSelectedGroup } = this.context
    const isDeletedGroupSelected =
      get(group, '_id') === get(selectedGroup, '_id')
    const { data: flaggedGroup } = await updateGroup(client, {
      ...group,
      trashed: true
    })
    const alertDuration = 3 * 1000

    const alertTimeout = setTimeout(() => {
      cleanTrashedGroups()
    }, alertDuration)

    Alerter.info('groups.removed', {
      name: flaggedGroup.name,
      buttonText: t('cancel'),
      buttonAction: () => {
        clearTimeout(alertTimeout)
        this.cancelGroupDelete(flaggedGroup)
      },
      duration: alertDuration
    })

    if (isDeletedGroupSelected) {
      setSelectedGroup(translatedDefaultSelectedGroup(t))
    }
  }

  cancelGroupDelete = async group => {
    const { client } = this.props
    delete group.trashed
    await updateGroup(client, group)
    Alerter.info('groups.remove_canceled', { name: group.name })
  }

  renameGroup = async (groupId, newName) => {
    const { selectedGroup, setSelectedGroup } = this.context
    const { allGroups, client } = this.props
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

  handleChange = props => {
    const { onChange, closeMenuOnSelect } = this.props

    if (closeMenuOnSelect) {
      this.closeMenu()
    }

    onChange(props)
  }

  render() {
    const {
      value,
      allGroups,
      styles,
      isMulti,
      noOptionsMessage,
      withCheckbox,
      components,
      className,
      closeMenuOnSelect,
      menuPosition
    } = this.props
    const { menuIsOpen, editedGroupId } = this.state
    const { toggleMenu, setEditedGroupId, handleChange } = this

    const defaultComponents = {
      Menu: CustomMenu,
      Option: CustomOption,
      SelectContainer: CustomSelectContainer
    }

    return (
      <div className={cx('u-flex-auto u-w-100', className)}>
        {menuIsOpen && (
          <Overlay className="overlay-creation-group" onClick={toggleMenu} />
        )}
        <SelectBox
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
          createGroup={this.createGroup}
          deleteGroup={this.deleteGroup}
          renameGroup={this.renameGroup}
          styles={styles}
          onControlClicked={toggleMenu}
          setEditedGroupId={setEditedGroupId}
          editedGroupId={editedGroupId}
          menuPosition={menuPosition}
        />
      </div>
    )
  }
}

GroupsSelectClass.propTypes = {
  cleanTrashedGroups: PropTypes.func.isRequired,
  allGroups: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
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
  className: PropTypes.string,
  closeMenuOnSelect: PropTypes.bool,
  menuPosition: PropTypes.oneOf(['fixed', 'absolute'])
}

GroupsSelectClass.defaultProps = {
  isMulti: false,
  components: {},
  closeMenuOnSelect: false
}

const GroupsSelect = flow(
  withClient,
  translate(),
  container
)(GroupsSelectClass)

GroupsSelect.propTypes = {
  allGroups: PropTypes.array.isRequired
}

export default GroupsSelect
