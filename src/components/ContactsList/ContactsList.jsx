import React, { Component } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import { ContactListLetterSelection } from './ContactListLetterSelection'

import withSelection from '../Selection/selectionContainer'

class ContactsList extends Component {
  state = {
    searchQuery: ''
  }

  categorizeContactsByLetter(categorizedContactsList) {
    const { searchQuery } = this.state
    const excludePattern = searchQuery === '' || searchQuery === 'RESET'

    if (excludePattern || !categorizedContactsList[searchQuery]) {
      return categorizedContactsList
    }

    return { [searchQuery]: categorizedContactsList[searchQuery] }
  }

  render() {
    const { clearSelection, contacts, selection, selectAll, t } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const isAllContactsSelected = contacts.length === selection.length
      const categorizedContacts = this.categorizeContactsByLetter(
        categorizeContacts(contacts, t('empty-list'))
      )

      return (
        <div className="list-wrapper">
          <ContactListLetterSelection
            onClick={event =>
              this.setState({
                searchQuery: event.target.value
              })
            }
          />
          {flag('select-all-contacts') && (
            <div>
              <Button
                label={
                  isAllContactsSelected ? t('unselect-all') : t('select-all')
                }
                theme="secondary"
                onClick={() =>
                  isAllContactsSelected ? clearSelection() : selectAll(contacts)
                }
              />
            </div>
          )}
          <ol className="list-contact">
            {Object.entries(categorizedContacts).map(([header, contacts]) => (
              <li key={`cat-${header}`}>
                <ContactHeaderRow key={header} header={header} />
                <ol className="sublist-contact">
                  {contacts.map(contact => (
                    <li key={`contact-${contact._id}`}>
                      <ContactRow
                        id={contact._id}
                        key={contact._id}
                        contact={contact}
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
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withSelection(ContactsList))
