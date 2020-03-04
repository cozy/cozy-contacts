import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import { Button } from 'cozy-ui/react'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { sortLastNameFirst, buildLastNameFirst } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
import withSelection from '../Selection/selectionContainer'
import Alphabets from '../Components/Alphabets'

class ContactsList extends Component {
  constructor(props) {
    super(props)
    this.contactHeaderRowRef = []
    this.contactListRef = React.createRef()
  }

  scrollTo = target => {
    const header = this.contactHeaderRowRef[target]
    const contactList = this.contactListRef.current
    contactList.scrollTop = header.offsetTop
  }

  render() {
    const {
      clearSelection,
      contacts,
      selection,
      showModal,
      selectAll,
      t
    } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const allContactsSelected = contacts.length === selection.length
      const sortedContacts = [...contacts].sort(sortLastNameFirst)
      const categorizedContacts = sortedContacts.reduce((acc, contact) => {
        const name = buildLastNameFirst(contact)
        const header = name[0] || 'EMPTY'
        acc[header] = acc[header] || []
        acc[header].push(contact)
        return acc
      }, {})
      return (
        <>
          <Alphabets scrollTo={this.scrollTo} />
          <div className="list-wrapper" ref={this.contactListRef}>
            {flag('select-all-contacts') && (
              <div>
                <Button
                  label={
                    allContactsSelected ? t('unselect-all') : t('select-all')
                  }
                  theme="secondary"
                  onClick={() =>
                    allContactsSelected ? clearSelection() : selectAll(contacts)
                  }
                />
              </div>
            )}
            <ol className="list-contact">
              {Object.keys(categorizedContacts).map(header => (
                <li key={`cat-${header}`}>
                  <ContactHeaderRow key={header} header={header} ref={c => this.contactHeaderRowRef[header] = c} />
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
        </>
      )
    }
  }
}
ContactsList.propTypes = {
  showModal: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withModal(withSelection(ContactsList)))
