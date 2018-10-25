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
    return _.find(contacts, c => c.id === id)
  }
  render() {
    const { displayImportation, onSelect, selection } = this.props
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
                                  selected:
                                    _.find(
                                      selection,
                                      s => s.id === contact._id
                                    ) !== undefined
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
