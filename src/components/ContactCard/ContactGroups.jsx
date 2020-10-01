import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'
import get from 'lodash/get'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import Context from '../Context'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import withGroupsMutations from '../../connections/allGroups'
import { isExistingGroup } from '../../helpers/groups'
import container from './ContactGroupsContainer'

export class ContactGroupsClass extends React.Component {
  static contextType = Context

  createGroup = async group => {
    const { allGroups, onGroupCreation } = this.props

    if (isExistingGroup(allGroups, group)) {
      return Alerter.error(
        this.props.t('groups.already_exists', { name: group.name })
      )
    }

    try {
      const createdGroup = await this.props.createGroup(group)
      if (onGroupCreation) {
        onGroupCreation(createdGroup)
      }
      return Alerter.success(this.props.t('groups.created.success'))
    } catch {
      return Alerter.error(this.props.t('groups.created.error'))
    }
  }

  deleteGroup = async group => {
    const { selectedGroup, setSelectedGroupAsDefault } = this.context
    const isGroupSelected = get(group, '_id') === get(selectedGroup, '_id')
    const { data: flaggedGroup } = await this.props.updateGroup({
      ...group,
      trashed: true
    })
    const alertDuration = 3 * 1000

    const alertTimeout = setTimeout(() => {
      this.props.cleanTrashedGroups()
    }, alertDuration)

    Alerter.info(this.props.t('groups.removed', { name: flaggedGroup.name }), {
      buttonText: this.props.t('cancel'),
      buttonAction: () => {
        clearTimeout(alertTimeout)
        this.cancelGroupDelete(flaggedGroup)
      },
      duration: alertDuration
    })

    if (isGroupSelected) {
      setSelectedGroupAsDefault()
    }
  }

  cancelGroupDelete = async group => {
    delete group.trashed
    await this.props.updateGroup(group)
    Alerter.info(this.props.t('groups.remove_canceled', { name: group.name }))
  }

  renameGroup = async (groupId, newName) => {
    const { selectedGroup, setSelectedGroup } = this.context
    const { allGroups } = this.props
    const group = allGroups.find(group => group.id === groupId)
    const allOtherGroups = allGroups.filter(group => group.id !== groupId)
    const isGroupSelected = get(group, '_id') === get(selectedGroup, '_id')

    if (isExistingGroup(allOtherGroups, { name: newName })) {
      return Alerter.error(
        this.props.t('groups.already_exists', { name: newName })
      )
    }

    try {
      const { data } = await this.props.updateGroup({ ...group, name: newName })
      if (isGroupSelected) {
        setSelectedGroup(data)
      }
      return Alerter.success(this.props.t('groups.renamed.success'))
    } catch {
      return Alerter.error(this.props.t('groups.renamed.error'))
    }
  }

  render() {
    const {
      value,
      allGroups,
      styles,
      onChange,
      control,
      isMulti,
      noOptionsMessage,
      preliminaryOptions
    } = this.props

    return (
      <div className="u-flex-shrink-0 u-m-0">
        <ContactGroupManager
          value={value}
          allGroups={allGroups}
          onChange={onChange}
          createGroup={this.createGroup}
          deleteGroup={this.deleteGroup}
          renameGroup={this.renameGroup}
          styles={styles}
          control={control}
          isMulti={isMulti}
          noOptionsMessage={noOptionsMessage}
          preliminaryOptions={preliminaryOptions}
        />
      </div>
    )
  }
}

export const ContactGroups = flow(
  withGroupsMutations,
  translate(),
  container
)(ContactGroupsClass)

ContactGroupsClass.propTypes = {
  cleanTrashedGroups: PropTypes.func.isRequired,
  allGroups: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  styles: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  // for multiple selections, value can an array
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  control: PropTypes.func,
  isMulti: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  preliminaryOptions: PropTypes.array
}

ContactGroupsClass.defaultProps = {
  isMulti: false,
  preliminaryOptions: []
}

ContactGroups.propTypes = {
  allGroups: PropTypes.array.isRequired
}

export default ContactGroups
