import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import { Query } from 'cozy-client'
import ContactCardModal from '../Modals/ContactCardModal'
import _ from 'lodash'
const query = client => client.find('io.cozy.contacts')

class ContactsList extends Component {
  state = {
    displayedContactId: null
  }
  onClick = (e, contactId) => {
    console.log('onClick', contactId)
    this.setState({
      displayedContactId: contactId
    })
  }
  hideContactCard = () => {
    this.setState({
      displayedContactId: null
    })
  }
  getContactById = (contacts, id) => {
    console.log('find id', id)
    console.log('contact', _.find(contacts, c => c._id === id))
    return _.find(contacts, c => c.id === id)
  }
  render() {
    const {
      displayImportation,
      onSelect,
      selection
      //onClickContact
    } = this.props
    const { displayedContactId } = this.state
    return (
      <Query query={query}>
        {({ data: contacts, fetchStatus }) => {
          if (fetchStatus === 'loading') {
            return 'loading...'
          }
          if (contacts.length === 0) {
            return <ContactsEmptyList displayImportation={displayImportation} />
          } else {
            console.log({ contacts })
            const sortedContacts = [...contacts].sort(sortLastNameFirst)
            const categorizedContacts = sortedContacts.reduce(
              (acc, contact) => {
                const name = buildLastNameFirst(contact)
                const header = name[0] || 'EMPTY'
                acc[header] = acc[header] || []
                acc[header].push(contact)
                return acc
              },
              {}
            )
            return (
              <div className="list-wrapper">
                <ol className="list-contact">
                  {Object.keys(categorizedContacts).map(header => (
                    <li key={`cat-${header}`}>
                      <ContactHeaderRow key={header} header={header} />
                      <ol className="sublist-contact">
                        {categorizedContacts[header].map(contact => (
                          <li key={`contact-${contact._id}`}>
                            <ContactRow
                              key={contact._id}
                              contact={contact}
                              selection={
                                onSelect && {
                                  onSelect: () => {
                                    onSelect(contact)
                                  },
                                  selected: selection.includes(contact)
                                }
                              }
                              onClick={e => this.onClick(e, contact._id)}
                            />
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
                <div>
                  {displayedContactId && (
                    <ContactCardModal
                      onClose={this.hideContactCard}
                      contact={this.getContactById(
                        contacts,
                        displayedContactId
                      )}
                      onDeleteContact={this.onDeleteContact}
                    />
                  )}
                </div>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

/* console.log({ props })
  if (props.contacts.length === 0) {
    return <ContactsEmptyList displayImportation={props.displayImportation} />
  }
  
} */
ContactsList.propTypes = {
  onClickContact: PropTypes.func,
  onSelect: PropTypes.func,
  selection: PropTypes.array,
  displayImportation: PropTypes.func.isRequired
}
ContactsList.defaultProps = {
  onClickContact: null,
  onSelect: null,
  selection: []
}

export default ContactsList
