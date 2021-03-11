import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'cozy-ui/transpiled/react/Table'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import SelectionButton from './SelectionButton'
import ContactsSubList from './ContactsSubList'

const UncategorizedList = ({
  contacts,
  areAllContactsSelected,
  handleAllContactSelection
}) => {
  return (
    <>
      <SelectionButton
        areAllContactsSelected={areAllContactsSelected}
        handleAllContactSelection={handleAllContactSelection}
      />

      <Table>
        <List key="no-category">
          <ContactsSubList contacts={contacts} />
        </List>
      </Table>
    </>
  )
}

UncategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired,
  areAllContactsSelected: PropTypes.bool.isRequired,
  handleAllContactSelection: PropTypes.func.isRequired
}

export default UncategorizedList
