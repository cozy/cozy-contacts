import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import SearchContext from '../Contexts/Search'
import { categorizeContacts } from '../../helpers/contactList'

const ContactsListAlphabeticalShortcuts = ({ contacts }) => {
  const { t } = useI18n()
  
  const isCategorisedList = () => {
    const { searchValue } = useContext(SearchContext)
    
    return searchValue.length === 0;
  }
  
  if (!isCategorisedList()) {
    return (null)
  }
    
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const letterShortcuts = Object
    .keys(categorizedContacts)
    .filter(letter => letter !== 'EMPTY')
    .sort();

  return (
    <div className="contacts-list-alphabetical-shortcuts">
      {letterShortcuts.map(letter => {
        return <a key={`#cat-${letter}`} href={`#cat-${letter}`}>{letter.toUpperCase()}</a>
      })}
    </div>
  )
}

ContactsListAlphabeticalShortcuts.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsListAlphabeticalShortcuts.defaultProps = {}

export default ContactsListAlphabeticalShortcuts
