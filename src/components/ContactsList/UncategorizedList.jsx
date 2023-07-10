import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'cozy-ui/transpiled/react/Table'
import List from 'cozy-ui/transpiled/react/List'

import ContactsSubList from './ContactsSubList'

const UncategorizedList = ({ contacts }) => {
  return (
    <Table>
      <List key="no-category">
        <ContactsSubList contacts={contacts} />
      </List>
    </Table>
  )
}

UncategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default UncategorizedList
