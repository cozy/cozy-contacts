import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'cozy-client'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import { withContactsMutations } from '../../connections/allContacts'
import { withGroupsMutations } from '../../connections/allGroups'
import SpinnerContact from '../Components/Spinner'

const groupsQuery = client => client.all('io.cozy.contacts.groups')
class ContactGroupsClass extends React.Component {
  state = {
    createdGroups: []
  }
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
    const createdGroup = await this.props.createGroup(group)
    const { contact } = this.props

    contact.groups.addById(createdGroup.data._id)
    await this.props.updateContact(contact)
    this.setState({
      createdGroups: [...this.state.createdGroups, createdGroup.data]
    })
  }
  render() {
    const { contact, allGroups } = this.props
    //! We shoudn't do all this stuff. We should have something like an obersable Query
    // doing all this stuff. Next time
    const { createdGroups } = this.state
    const allGroupsAndCreated = [...allGroups, ...createdGroups]
    const userGroups = contact.groups.data
      .map(groupUser =>
        allGroupsAndCreated.find(group => group._id === groupUser._id)
      )
      .filter(value => value)

    return (
      <div className="contact-card-identity__groups">
        <ContactGroupManager
          contactGroups={userGroups}
          allGroups={allGroupsAndCreated}
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

const ConnectedContactGroups = ({ contact, updateContact }) => {
  return (
    <Query query={groupsQuery}>
      {({ data: allGroups, fetchStatus }) => {
        if (fetchStatus === 'loaded') {
          return (
            <ContactGroups
              contact={contact}
              updateContact={updateContact}
              allGroups={allGroups}
            />
          )
        } else {
          return <SpinnerContact />
        }
      }}
    </Query>
  )
}

ConnectedContactGroups.propTypes = {
  contact: fullContactPropTypes.isRequired,
  updateContact: PropTypes.func.isRequired
}

export default withContactsMutations(ConnectedContactGroups)
