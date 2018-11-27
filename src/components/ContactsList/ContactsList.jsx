import React, { Component } from 'react'
import { Query } from 'cozy-client'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import SpinnerContact from '../Components/Spinner'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
const query = client => client.all('io.cozy.contacts').limitBy(50)

class ContactsList extends Component {
  render() {
    const { showModal } = this.props
    return (
      <Query query={query}>
        {({ data: contacts, fetchStatus }) => {
          if (fetchStatus === 'loading') {
            return (
              <SpinnerContact size="xxlarge" loadingType="fetching_contacts" />
            )
          }
          if (contacts.length === 0) {
            return <ContactsEmptyList />
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
                              onClick={() =>
                                showModal(
                                  <ContactCardModal
                                    onClose={this.hideContactCard}
                                    id={contact._id}
                                  />
                                )
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
ContactsList.propTypes = {}
ContactsList.defaultProps = {}

export default withModal(ContactsList)
