import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'
import SearchContext from '../Contexts/Search'
import { applyRefIfCurrentSection, scrollToSection } from '../../helpers/search'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const ref = useRef()
  const { searchValue } = useContext(SearchContext)

  useEffect(() => {
    scrollToSection(searchValue, ref)
  }, [searchValue])

  return (
    <Table>
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <List
          key={`cat-${header}`}
          {...applyRefIfCurrentSection(searchValue, header, ref)}
        >
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
