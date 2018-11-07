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
    createdGroup: []
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.createdGroup.length !== this.state.createdGroup.length) {
      document.getElementsByClassName('react-select__menu-list')[0].scrollTop =
        '9999'
    }
  }
  createGroup = async group => {
    const createdGroup = await this.props.createGroup(group)
    const { contact } = this.props

    contact.groups.addById(createdGroup.data._id)
    await this.props.updateContact(contact)
    const test = [...this.state.createdGroup, createdGroup.data]
    this.setState({
      createdGroup: test
    })
  }
  render() {
    const { contact, allGroups } = this.props
    //! TODO NOT HAPPY WITH THIS CODE and createGroup
    const { createdGroup } = this.state
    let allGroupsAndCreated = [...allGroups]
    if (createdGroup.length > 0) {
      allGroupsAndCreated = [...allGroupsAndCreated, ...createdGroup]
    }
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
