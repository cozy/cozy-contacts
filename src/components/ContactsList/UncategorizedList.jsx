import PropTypes from 'prop-types'
import React from 'react'

import List from 'cozy-ui/transpiled/react/List'
import { Table } from 'cozy-ui/transpiled/react/Table'

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
