import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ContactHeaderRow from './ContactHeaderRow'
import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const { letters, categorizedContacts } = categorizeContacts(
    contacts,
    t('empty-list')
  )

  return (
    <ol className="list-contact">
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <li key={`cat-${header}`} id={`CategorizedList-cat-${header}`}>
          <ContactHeaderRow key={header} header={header} letters={letters} />
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
