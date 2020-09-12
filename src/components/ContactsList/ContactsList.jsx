import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts, filterContacts } from '../../helpers/contactList'
import AlphabetNavigation from '../AlphabetNavigation/AlphabetNavigation'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'

import withFilter from '../Filter/filterContainer'
import withSelection from '../Selection/selectionContainer'

class ContactsList extends Component {
  render() {
    const {
      clearSelection,
      contacts,
      filter,
      updateFilter,
      selection,
      selectAll,
      t
    } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const allContactsSelected = contacts.length === selection.length
      const filteredContacts = filterContacts(contacts, filter)
      const categorizedContacts = categorizeContacts(
        filteredContacts,
        t('empty-list')
      )

      return (
        <div className="list-with-filter-wrapper">
          <div className="alphabet-navigation-wrapper">
            <AlphabetNavigation
              contacts={contacts}
              current={filter}
              onNavigate={letter => updateFilter(letter)}
            />
          </div>

          <div className="list-wrapper">
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
                  <ContactHeaderRow key={header} header={header} />
                  <ol className="sublist-contact">
                    {categorizedContacts[header].map(contact => (
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
        </div>
      )
    }
  }
}
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withFilter(withSelection(ContactsList)))
