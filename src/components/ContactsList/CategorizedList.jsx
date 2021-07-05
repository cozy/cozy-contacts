import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import { makeStyles } from '@material-ui/styles'

import ContactsSubList from './ContactsSubList'
import VerticalLettersChip from './VerticalLettersChip'
import { categorizeContacts } from '../../helpers/contactList'

const useStyles = makeStyles(() => ({
  charsChipWrapper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  }
}))

const getAlphabetLetters = () => {
  const alphabet = [],
    charZCode = 'z'.charCodeAt(0)
  let i = 'a'.charCodeAt(0)
  while (i <= charZCode) {
    alphabet.push(String.fromCharCode(i++))
  }
  return alphabet
}

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const classes = useStyles()
  const alphabetLetters = React.useMemo(getAlphabetLetters, [])
  const categorizedContacts = React.useMemo(
    () => categorizeContacts(contacts, t('empty-list')),
    [contacts, t]
  )
  const categoriesRefs = React.useMemo(
    () =>
      Object.keys(categorizedContacts).reduce((refs, cat) => {
        refs[cat] = React.createRef()
        return refs
      }, {}),
    [categorizedContacts]
  )

  return (
    <div>
      <Table>
        <div className={classes.charsChipWrapper}>
          <VerticalLettersChip
            letters={alphabetLetters.map(letter => ({
              name: letter,
              ref: categoriesRefs[letter]
            }))}
          />
        </div>

        {Object.entries(categorizedContacts).map(([header, contacts]) => (
          <List key={`cat-${header}`} ref={categoriesRefs[header]}>
            <ListSubheader key={header}>{header}</ListSubheader>
            <ContactsSubList contacts={contacts} />
          </List>
        ))}
      </Table>
    </div>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
