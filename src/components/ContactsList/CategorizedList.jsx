import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import { useBreakpoints } from 'cozy-ui/transpiled/react'

import ContactsSubList from './ContactsSubList'

const CategorizedList = ({
  categorizedContacts,
  displayCategory = false,
  refs = {}
}) => {
  const { isMobile } = useBreakpoints()

  return (
    <Table>
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <List
          key={`cat-${header}`}
          ref={refs[header]}
          style={{ scrollMarginTop: isMobile && '3em' }}
        >
          {displayCategory && (
            <ListSubheader key={header}>{header}</ListSubheader>
          )}
          <ContactsSubList contacts={contacts} />
        </List>
      ))}
    </Table>
  )
}

CategorizedList.propTypes = {
  displayCategory: PropTypes.bool,
  categorizedContacts: PropTypes.object.isRequired,
  refs: PropTypes.object
}

export default CategorizedList
