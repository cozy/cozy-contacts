import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CategorizedList from './CategorizedList'
import ContactsEmptyList from './ContactsEmptyList'
import UncategorizedList from './UncategorizedList'
import SearchContext from '../Contexts/Search'
import withSelection from '../Selection/selectionContainer'

const ContactsList = ({ contacts, clearSelection, selection, selectAll }) => {
  const { t } = useI18n()
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const List = searchValue.length > 0 ? UncategorizedList : CategorizedList
  const isAllContactsSelected = contacts.length === selection.length

  const handleAllContactSelection = () => {
    isAllContactsSelected ? clearSelection() : selectAll(contacts)
  }

  return (
    <div className="list-wrapper">
      {flag('select-all-contacts') && (
        <div>
          <Button
            label={isAllContactsSelected ? t('unselect-all') : t('select-all')}
            variant="secondary"
            onClick={handleAllContactSelection}
            className="u-mb-1"
          />
        </div>
      )}
      <List contacts={contacts} />
    </div>
  )
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withSelection(ContactsList)
