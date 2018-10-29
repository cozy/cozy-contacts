import React from 'react'
import PropTypes from 'prop-types'
import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import { withContactsMutations } from '../../connections/allContacts'
import { Query } from 'cozy-client'
import { Spinner } from 'cozy-ui/react/Spinner'
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

  render() {
    const { contact, allGroups } = this.props
    const userGroups = contact.groups.data
      .map(groupUser => allGroups.find(group => group._id === groupUser._id))
      .filter(value => value)
    return (
      <div className="contact-card-identity__groups">
        <ContactGroupManager
          contactGroups={contact.groups.data}
          allGroups={allGroups}
          onGroupSelectionChange={this.updateContactGroups}
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
export const ContactGroups = withContactsMutations(ContactGroupsClass)

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
          return <Spinner />
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
