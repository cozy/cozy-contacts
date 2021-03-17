import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ContactsEmptyList from './ContactsEmptyList'
import CategorizedList from './CategorizedList'
import UncategorizedList from './UncategorizedList'
import withSelection from '../Selection/selectionContainer'
import SearchContext from '../Contexts/Search'
import { categorizeContacts } from '../../helpers/contactList'

const ContactsList = ({ contacts, clearSelection, selection, selectAll }) => {
  const { t } = useI18n()
  const { searchValue } = useContext(SearchContext)
  const [selected, setSelected] = useState('');

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const List = searchValue.length > 0 ? UncategorizedList : CategorizedList
  const isAllContactsSelected = contacts.length === selection.length

  const handleAllContactSelection = () => {
    isAllContactsSelected ? clearSelection() : selectAll(contacts)
  }

  const letterCategorie = Object.entries(categorizeContacts(contacts, t('empty-list')))
    .filter(([header]) => header !== 'EMPTY')

  return (
    <div className="list-wrapper">
      <ul className="directory" role='directory'>
         {letterCategorie.map(([header], i) => (
              <li key={i} className={`viewContent${header === selected ? ' selected' : ''}`}>
                  <a href={`#${header}`} onClick={() => setSelected(header)}>
                    <span className='title'>{header}</span>
                  </a>
              </li>)
          )}
      </ul>
      <div className='contact-list'>
          {flag('select-all-contacts') && (
            <div>
              <Button
                label={isAllContactsSelected ? t('unselect-all') : t('select-all')}
                theme="secondary"
                onClick={handleAllContactSelection}
                />
            </div>
          )}
          <List contacts={contacts} />
      </div>
    </div>
  )
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withSelection(ContactsList)
