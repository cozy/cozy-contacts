import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import { Button } from 'cozy-ui/react'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { sortLastNameFirst, buildLastNameFirst, sortContactsBy } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
import withSelection from '../Selection/selectionContainer'
import ContactsFilters from './ContactsFilters'

const defaultFilter = 'all'

class ContactsList extends Component {
  state = {
    filter: defaultFilter
  }

  setFilter = filter => {
    this.setState({ filter })
  }

  render() {
    const {
      clearSelection,
      contacts,
      allGroups,
      selection,
      showModal,
      selectAll,
      t
    } = this.props
    const { filter } = this.state

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const allContactsSelected = contacts.length === selection.length
      let sortedContacts = [...contacts].sort(sortLastNameFirst)
      if (filter !== defaultFilter) {
        sortedContacts = sortContactsBy(sortedContacts, filter)
      }
      const categorizedContacts = sortedContacts.reduce((acc, contact) => {
        const name = buildLastNameFirst(contact)
        const header = name[0] || 'EMPTY'
        acc[header] = acc[header] || []
        acc[header].push(contact)
        return acc
      }, {})

      return (
        <>
          {allGroups !== undefined &&
            allGroups.length >= 1 && (
              <ContactsFilters
                setFilter={this.setFilter}
                filter={filter}
                allGroups={allGroups}
                defaultFilter={defaultFilter}
              />
            )}
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
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withModal(withSelection(ContactsList)))
