import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactsSubList from './ContactsSubList'
import NavByLetter from '../NavByLetter'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const refs = Object.entries(categorizedContacts).reduce((acc, [header]) => {
    acc[header] = React.createRef()
    return acc
  }, {})

  const handleClickLetter = React.useCallback(
    letter => {
      refs[letter].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      refs[letter].current.focus({ preventScroll: true })
    },
    [refs]
  )

  return (
    <>
      <NavByLetter
        usedLetters={Object.keys(refs)}
        onClickLetter={handleClickLetter}
      />
      <Table className="u-ov-auto">
        {Object.entries(categorizedContacts).map(([header, contacts]) => (
          <List key={`cat-${header}`} ref={refs[header]} tabIndex={-1}>
            <ListSubheader key={header}>{header}</ListSubheader>
            <ContactsSubList contacts={contacts} />
          </List>
        ))}
      </Table>
    </>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
