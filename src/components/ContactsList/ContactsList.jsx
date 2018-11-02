import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'cozy-client'
import find from 'lodash/find'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import SpinnerContact from '../Components/Spinner'
const query = client => client.find('io.cozy.contacts').include(['groups'])

class ContactsList extends Component {
  state = {
    displayedContactId: null
  }
  onClick = (e, contactId) => {
    this.setState(() => ({
      displayedContactId: contactId
    }))
  }
  hideContactCard = () => {
    this.setState(() => ({
      displayedContactId: null
    }))
  }

  render() {
    const { displayImportation, onSelect, selection, groups } = this.props
    return (
      <Query query={query}>
        {({ data: contacts, fetchStatus }) => {
          if (fetchStatus === 'loading') {
            return (
              <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
            )
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
                              id={contact._id}
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
                            />
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
                <div />
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
