import PropTypes from 'prop-types'
import React from 'react'

import { categorizeContacts } from 'cozy-ui/transpiled/react/ContactsList/helpers'
import List from 'cozy-ui/transpiled/react/List'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import { Table } from 'cozy-ui/transpiled/react/Table'

import ContactsSubList from './ContactsSubList'

const CategorizedList = ({ contacts }) => {
  const categorizedContacts = categorizeContacts(contacts)

  console.info(' ')
  console.info('contacts :', contacts)
  console.info('categorizedContacts :', categorizedContacts)
  console.info(' ')

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
