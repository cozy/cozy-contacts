import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'cozy-client'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import withContactsMutations from '../../connections/allContacts'
import withGroupsMutations from '../../connections/allGroups'
import SpinnerContact from '../Components/Spinner'
import { checkIfGroupAlreadyExists } from '../ContactGroups/helpers/groups'
const groupsQuery = client => client.all('io.cozy.contacts.groups')
class ContactGroupsClass extends React.Component {
  updateContactGroups = groups => {
    const { contact } = this.props

    contact.groups.data.map(group => {
      contact.groups.removeById(group._id)
    })
    groups.map(groupToAdd => {
      contact.groups.addById(groupToAdd._id)
    })
    this.props.updateContact(contact)
  }
  createGroup = async group => {
    const { contact, allGroups } = this.props

    if (checkIfGroupAlreadyExists(allGroups, group)) {
      return
    }
    const createdGroup = await this.props.createGroup(group)

    contact.groups.addById(createdGroup.data._id)
    await this.props.updateContact(contact)
    })
  }
  render() {
    const { contact, allGroups } = this.props
    const userGroups = contact.groups.data
      .map(userGroup => allGroups.find(group => group._id === userGroup._id))
      .filter(value => value)

    return (
      <div className="contact-card-identity__groups">
        <ContactGroupManager
          contactGroups={userGroups}
          allGroups={allGroups}
          onGroupSelectionChange={this.updateContactGroups}
          createGroup={this.createGroup}
        />
        <ol className="contact-groups-list">
          {userGroups.map(group => (
            <li key={group._id} className="contact-groups-list__tag">
              {group.name}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
export const ContactGroups = withGroupsMutations(
  withContactsMutations(ContactGroupsClass)
)

ContactGroupsClass.propTypes = {
  contact: PropTypes.object.isRequired,
  updateContact: PropTypes.func.isRequired,
  allGroups: PropTypes.array.isRequired
}

const ConnectedContactGroups = ({ contact }) => {
  return (
    <Query query={groupsQuery}>
      {({ data: allGroups, fetchStatus }) => {
        if (fetchStatus === 'loaded') {
          return <ContactGroups contact={contact} allGroups={allGroups} />
        } else {
          return <SpinnerContact />
        }
      }}
    </Query>
  )
}

ConnectedContactGroups.propTypes = {
  contact: fullContactPropTypes.isRequired
}

export default ConnectedContactGroups
