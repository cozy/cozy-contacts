import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'cozy-client'
import find from 'lodash/find'
import { Spinner } from 'cozy-ui/react'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import ContactCardModal from '../Modals/ContactCardModal'

const query = client => client.find('io.cozy.contacts').include(['groups'])

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
    return find(contacts, c => c.id === id)
  }
  render() {
    const { displayImportation, onSelect, selection, groups } = this.props
    const { displayedContactId } = this.state
    return (
      <Query query={query}>
        {({ data: contacts, fetchStatus }) => {
          if (fetchStatus === 'loading') {
            return <Spinner size="xxlarge" />
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
                              groups={groups}
                              selection={
                                onSelect && {
                                  onSelect: () => {
                                    onSelect(contact)
                                  },
                                  selected:
                                    find(
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
                      groups={groups}
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
  displayImportation: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
}
ContactsList.defaultProps = {
  onClickContact: null,
  onSelect: null,
  selection: []
}

export default ContactsList
