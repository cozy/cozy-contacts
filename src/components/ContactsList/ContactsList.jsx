import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'

class ContactsList extends Component {
  render() {
    const { showModal, contacts } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const sortedContacts = [...contacts].sort(sortLastNameFirst)
      const categorizedContacts = sortedContacts.reduce((acc, contact) => {
        const name = buildLastNameFirst(contact)
        const header = name[0] || 'EMPTY'
        acc[header] = acc[header] || []
        acc[header].push(contact)
        return acc
      }, {})
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
  }
}
ContactsList.propTypes = {
  showModal: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withModal(ContactsList)
