import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'
import get from 'lodash/get'
import differenceBy from 'lodash/differenceBy'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import withContactsMutations from '../../connections/allContacts'
import withGroupsMutations from '../../connections/allGroups'
import { isExistingGroup } from '../../helpers/groups'
import container from './ContactGroupsContainer'

export class ContactGroupsClass extends React.Component {
  updateContactGroups = nextGroups => {
    const { contact } = this.props

    const currentGroups = contact.groups.data
    const toAdd = differenceBy(nextGroups, currentGroups, '_id')
    const toRemove = differenceBy(currentGroups, nextGroups, '_id')

    if (toAdd.length > 0) contact.groups.addById(toAdd.map(({ _id }) => _id))
    else if (toRemove.length > 0)
      contact.groups.removeById(toRemove.map(({ _id }) => _id))
    // we can't do both at the same time right now, see https://github.com/cozy/cozy-client/issues/358
  }

  createGroup = async group => {
    const { contact, allGroups } = this.props

    if (isExistingGroup(allGroups, group)) {
      return Alerter.error(
        this.props.t('groups.already_exists', { name: group.name })
      )
    }

    const createdGroup = await this.props.createGroup(group)
    if (get(createdGroup, 'data.name') === group.name) {
      await contact.groups.addById(createdGroup.data._id)
      return Alerter.success(this.props.t('groups.created.success'))
    }

    Alerter.error(this.props.t('groups.created.error'))
  }

  deleteGroup = async group => {
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
  }

  cancelGroupDelete = async group => {
    delete group.trashed
    await this.props.updateGroup(group)
    Alerter.info(this.props.t('groups.remove_canceled', { name: group.name }))
  }

  renameGroup = async (groupId, newName) => {
    const { allGroups } = this.props
    const group = allGroups.find(group => group.id === groupId)
    const allOtherGroups = allGroups.filter(group => group.id !== groupId)

    if (isExistingGroup(allOtherGroups, { name: newName })) {
      return Alerter.error(
        this.props.t('groups.already_exists', { name: newName })
      )
    }

    const updatedGroup = await this.props.updateGroup({
      ...group,
      name: newName
    })
    if (get(updatedGroup, 'data.name') === newName) {
      return Alerter.success(this.props.t('groups.renamed.success'))
    }
    Alerter.error(this.props.t('groups.renamed.error'))
  }

  render() {
    const { contact, allGroups } = this.props
    const userGroups = contact.groups.data
      .filter(group => group)
      .map(userGroup => allGroups.find(group => group._id === userGroup._id))
      .filter(value => value)

    return (
      <div className="u-flex-shrink-0 u-m-0">
        <ContactGroupManager
          contactGroups={userGroups}
          allGroups={allGroups}
          onGroupSelectionChange={this.updateContactGroups}
          createGroup={this.createGroup}
          deleteGroup={this.deleteGroup}
          renameGroup={this.renameGroup}
        />
      </div>
    )
  }
}

export const ContactGroups = flow(
  withGroupsMutations,
  withContactsMutations,
  translate(),
  container
)(ContactGroupsClass)

ContactGroupsClass.propTypes = {
  contact: fullContactPropTypes.isRequired,
  updateContact: PropTypes.func.isRequired,
  cleanTrashedGroups: PropTypes.func.isRequired,
  allGroups: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}

ContactGroups.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContactGroups
