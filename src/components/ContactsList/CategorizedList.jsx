import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'
import HeaderNavigator from './HeaderNavigator'

/**
 *
 * @param header: the string containing the header to display
 * @param contacts: an array containing the contacts to display
 * @returns A pair of [header, ref, element] where
 * header is the string containing the header to display,
 * ref is a reference to the element,
 * element is the {JSX.Element} containing the contact sublist
 */
function getContactSubListWithHeadersAndRef(header, contacts) {
  const ref = React.createRef()
  return [
    header,
    ref,
    <List key={`cat-${header}`} ref={ref}>
      <ListSubheader key={header}>{header}</ListSubheader>
      <ContactsSubList contacts={contacts} />
    </List>
  ]
}

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))
  const sublistsWithHeadersAndRef = Object.entries(categorizedContacts).map(
    ([header, contacts]) => getContactSubListWithHeadersAndRef(header, contacts)
  )
  const headersWithRef = sublistsWithHeadersAndRef.map(([header, ref]) => [
    header,
    ref
  ])
  const sublists = sublistsWithHeadersAndRef.map(([, , sublist]) => sublist)
  return (
    <div className="categorized-list-wrapper">
      <Table className="table-wrapper">{sublists}</Table>
      <HeaderNavigator headersWithRef={headersWithRef} />
    </div>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
