import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  return (
    <ol className="list-contact">
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <li key={`cat-${header}`}>
          <ListSubheader key={header}>{header}</ListSubheader>

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
