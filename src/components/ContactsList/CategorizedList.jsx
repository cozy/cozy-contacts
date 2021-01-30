import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import ContactHeaderRow from './ContactHeaderRow'
import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  document.onkeypress = function handleKeyPress(event) {
    const contactCategory = document.getElementsByClassName(
      `contact-category-${event.key.toLowerCase()}`
    )

    if (contactCategory.length == 0) {
      return
    }

    Alerter.info(`Jump To ${event.key.toUpperCase()}`)
    contactCategory[0].scrollIntoView()
  }

  return (
    <ol className="list-contact">
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <li key={`cat-${header}`} className={'contact-category-' + header}>
          <ContactHeaderRow key={header} header={header} />
          <ContactsSubList contacts={contacts} />
        </li>
      ))}
    </ol>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
