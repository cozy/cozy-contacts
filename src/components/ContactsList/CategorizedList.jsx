import PropTypes from 'prop-types'
import React from 'react'

import List from 'cozy-ui/transpiled/react/List'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import { Table } from 'cozy-ui/transpiled/react/deprecated/Table'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t)

  return (
    <Table>
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <List key={`cat-${header}`} className="u-pt-0">
          <ListSubheader key={header}>{header}</ListSubheader>
          <ContactsSubList contacts={contacts} />
        </List>
      ))}
    </Table>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
