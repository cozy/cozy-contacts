import React from 'react'
import PropTypes from 'prop-types'

import withSelection from '../Selection/selectionContainer'

import { getSortedIdentifiers } from '../../helpers/contactSpeedDialIdentifier'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ContactsListSpeedDialItem from './ContactsListSpeedDialItem'

const ContactsListSpeedDial = ({ filteredContacts }) => {
  const { lang } = useI18n()

  const identifiers = getSortedIdentifiers(filteredContacts, lang)

  return (
    <div className="list-speed-dial">
      {identifiers.map(identifier => {
        return (
          <ContactsListSpeedDialItem
            item={identifier}
            key={identifier}
          ></ContactsListSpeedDialItem>
        )
      })}
    </div>
  )
}

ContactsListSpeedDial.propTypes = {
  filteredContacts: PropTypes.array.isRequired
}
ContactsListSpeedDial.defaultProps = {}

export default withSelection(ContactsListSpeedDial)
