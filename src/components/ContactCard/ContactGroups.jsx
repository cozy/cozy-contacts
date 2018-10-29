import React from 'react'
import PropTypes from 'prop-types'
import { fullContactPropTypes } from '../ContactPropTypes'
import ContactGroupManager from '../ContactGroups/ContactGroupManager'
import { withContactsMutations } from '../../connections/allContacts'
import { Query } from 'cozy-client'
const groupsQuery = client => client.all('io.cozy.contacts.groups')
export class ContactGroups extends React.Component {
  updateContactGroups = groups => {
    const newContact = {
      ...this.props.contact,
      groups: {
        ...this.props.contact.groups,
        data: {
          ...this.props.contact.data,
          ...groups
        }
      }
    }
    this.props.updateContact(newContact)
  }

  render() {
    return (
      <Query query={groupsQuery}>
        {({ data: allGroups, fetchStatus }) => {
          if (fetchStatus === 'loaded') {
            const { contact } = this.props
            const fullGroups = contact.groups.data
              .map(groupUser =>
                allGroups.find(group => group._id === groupUser._id)
              )
              .filter(value => value)
            return (
              <div className="contact-card-identity__groups">
                <ContactGroupManager
                  contactGroups={contact.groups.data}
                  allGroups={allGroups}
                  onGroupSelectionChange={this.updateContactGroups}
                />
                <ol className="contact-groups-list">
                  {fullGroups.map(group => (
                    <li key={group._id} className="contact-groups-list__tag">
                      {group.name}
                    </li>
                  ))}
                </ol>
              </div>
            )
          } else {
            return 'loading...'
          }
        }}
      </Query>
    )
  }
}

ContactGroups.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  updateContact: PropTypes.func.isRequired
}

const ConnectedContactGroups = ({ contact, updateContact }) => {
  return <ContactGroups contact={contact} updateContact={updateContact} />
}

ConnectedContactGroups.propTypes = {
  data: PropTypes.array,
  fetchStatus: PropTypes.string.isRequired,
  contact: fullContactPropTypes.isRequired,
  updateContact: PropTypes.func.isRequired
}

export default withContactsMutations(ConnectedContactGroups)
