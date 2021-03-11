import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import AlphabeticalLinks from './AlphabeticalLinks'
import SelectionButton from './SelectionButton'
import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({
  contacts,
  areAllContactsSelected,
  handleAllContactSelection
}) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const initials = Object.keys(categorizedContacts)
  const refs = initials.reduce((references, letter) => {
    references[letter] = React.createRef()
    return references
  }, {})

  const onAlphabetClick = letter => {
    refs[letter.toLowerCase()].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <>
      <AlphabeticalLinks
        categorizedContacts={categorizedContacts}
        onClick={letter => onAlphabetClick(letter)}
      />

      <SelectionButton
        areAllContactsSelected={areAllContactsSelected}
        handleAllContactSelection={handleAllContactSelection}
      />

      <Table>
        {Object.entries(categorizedContacts).map(([header, contacts]) => (
          <List key={`cat-${header}`}>
            <ListSubheader key={header} ref={refs[header]}>
              {header}
            </ListSubheader>
            <ContactsSubList contacts={contacts} />
          </List>
        ))}
      </Table>
    </>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired,
  areAllContactsSelected: PropTypes.bool.isRequired,
  handleAllContactSelection: PropTypes.func.isRequired
}

export default CategorizedList
