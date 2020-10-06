import React, { Component } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactHeaderRow from './ContactHeaderRow'

import withSelection from '../Selection/selectionContainer'

const getGroupId = key => `contact-group-${key}`

class ContactsList extends Component {
  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp(event) {
    const { key } = event

    if (!key.match(/^[a-z]$/i)) {
      /**
       * Ignore keyup for non letter keys
       * the `i` flag is needed when caps lock is activated
       */
      return
    }

    this.scrollToGroup(key)
  }

  scrollToGroup(id) {
    const groupElement = document.getElementById(getGroupId(id))

    if (groupElement) {
      groupElement.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  render() {
    const { clearSelection, contacts, selection, selectAll, t } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const isAllContactsSelected = contacts.length === selection.length
      const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

      return (
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
            {Object.entries(categorizedContacts).map(([header, contacts]) => (
              <li key={`cat-${header}`} id={getGroupId(header)}>
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
