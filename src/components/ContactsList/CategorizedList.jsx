import React, { useContext, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'
import SearchByLetterContext from '../Contexts/SearchByLetter'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const { searchByLetterValue, setSearchByLetterValue } = useContext(
    SearchByLetterContext
  )

  const headerRefs = Object.keys(categorizedContacts).reduce((acc, curr) => {
    acc[curr] = createRef()
    return acc
  }, {})

  useEffect(() => {
    if (searchByLetterValue) {
      headerRefs[searchByLetterValue].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    return () => {
      setSearchByLetterValue('')
    }
  }, [headerRefs, searchByLetterValue, setSearchByLetterValue])

  return (
    <Table>
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <List key={`cat-${header}`} ref={headerRefs[header]}>
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
