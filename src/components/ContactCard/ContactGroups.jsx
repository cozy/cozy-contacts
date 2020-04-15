import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'
import differenceBy from 'lodash/differenceBy'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import withContactsMutations from '../../connections/allContacts'
import withGroupsMutations from '../../connections/allGroups'
import { checkIfGroupAlreadyExists } from '../ContactGroups/helpers/groups'
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

    if (checkIfGroupAlreadyExists(allGroups, group)) {
      return
    }
    const createdGroup = await this.props.createGroup(group)

    await contact.groups.addById(createdGroup.data._id)
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
  contact: PropTypes.object.isRequired,
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
