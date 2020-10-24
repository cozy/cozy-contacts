import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CategorizedList from './CategorizedList'
import UncategorizedList from './UncategorizedList'
import withSelection from '../Selection/selectionContainer'
import SearchContext from '../Contexts/Search'

const ContactsList = ({ contacts, clearSelection, selection, selectAll }) => {
  const { t } = useI18n()
  const { searchValue } = useContext(SearchContext)

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
            theme="secondary"
            onClick={handleAllContactSelection}
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
