import React, { createRef } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'
import ContactsEmptyList from './ContactsEmptyList'
import ContactsListNav from './ContactsListNav'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'

import withSelection from '../Selection/selectionContainer'

const ContactsList = ({ clearSelection, contacts, selection, selectAll, t }) => {
  if (contacts.length === 0) {
    return <ContactsEmptyList />
  } else {
    const isAllContactsSelected = contacts.length === selection.length
    const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
    const headerRefs = {};
    const scrollToRef = char => headerRefs[char] && headerRefs[char].current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    return (
      <div className="list-container">
        <div className="list-wrapper">
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
            {Object.entries(categorizedContacts).map(([header, contacts]) => {
              headerRefs[header] = createRef()
              return (
                <li key={`cat-${header}`} ref={headerRefs[header]}>
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
              )
            })}
          </ol>
          <div />
        </div>
        <ContactsListNav handleClick={scrollToRef} activeItems={Object.entries(categorizedContacts).map(([h]) => h)} />
      </div>
    )
  }
}
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default translate()(withSelection(ContactsList))
