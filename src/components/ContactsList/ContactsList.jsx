import React, { useContext, createRef } from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ContactsEmptyList from './ContactsEmptyList'
import CategorizedList from './CategorizedList'
import withSelection from '../Selection/selectionContainer'
import SearchContext from '../Contexts/Search'
import LetterScroller from './LetterScroller'
import { categorizeContacts } from '../../helpers/contactList'
import { Content } from 'cozy-ui/transpiled/react/Layout'

const ContactsList = ({ contacts, clearSelection, selection, selectAll }) => {
  const { t } = useI18n()
  const { searchValue } = useContext(SearchContext)

  if (contacts.length === 0) {
    return <ContactsEmptyList />
  }

  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const showLetterScroller = contacts.length !== 0 && searchValue.length === 0

  const refs = Object.fromEntries(
    Object.keys(categorizedContacts).map(header => [header, createRef()])
  )

  const isAllContactsSelected = contacts.length === selection.length

  const handleAllContactSelection = () => {
    isAllContactsSelected ? clearSelection() : selectAll(contacts)
  }

  return (
    <>
      {showLetterScroller && (
        <LetterScroller contacts={categorizedContacts} refs={refs} />
      )}
      <Content>
        <div className="list-wrapper">
          {flag('select-all-contacts') && (
            <div>
              <Button
                label={
                  isAllContactsSelected ? t('unselect-all') : t('select-all')
                }
                theme="secondary"
                onClick={handleAllContactSelection}
              />
            </div>
          )}
          <CategorizedList
            categorizedContacts={categorizedContacts}
            displayCategory={searchValue.length === 0}
            refs={refs}
          />
        </div>
      </Content>
    </>
  )
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withSelection(ContactsList)
