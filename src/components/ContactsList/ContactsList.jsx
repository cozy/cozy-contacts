import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'

import withSelection from '../Selection/selectionContainer'
import Navigation from './Navigation/Navigation'

const ContactList = ({ clearSelection, contacts, selection, selectAll, t }) => {
  const allContactsSelected = contacts.length === selection.length
  const categorizedContacts = useMemo(
    () => categorizeContacts(contacts, t('empty-list')),
    [contacts]
  )

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const letters = Object.keys(categorizedContacts)
  return (
    <div className="contacts-wrapper">
      <div className="list-wrapper">
        {flag('select-all-contacts') && (
          <div>
            <Button
              label={allContactsSelected ? t('unselect-all') : t('select-all')}
              theme="secondary"
              onClick={() =>
                allContactsSelected ? clearSelection() : selectAll(contacts)
              }
            />
          </div>
        )}
        <ol className="list-contact">
          {letters.map(header => {
            return (
              <li id={header} key={`cat-${header}`}>
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
            )
          })}
        </ol>
        <div />
      </div>
      <Navigation letters={letters.filter(l => l !== 'EMPTY')} />
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactList.defaultProps = {}

export default translate()(withSelection(ContactList))
