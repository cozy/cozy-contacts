import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import NavigationList, {
  NavigationListHeader,
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const categorizedContactsRefs = Object.fromEntries(
    Object.keys(categorizedContacts).map(header => [header, React.createRef()])
  )

  const jumpToHeader = ref => {
    ref.current.scrollIntoView(true)
    ref.current.focus()
  }

  return (
    <div className="categorized-list-wrapper">
      <NavigationList className="categorized-list-navigation">
        <NavigationListHeader>{t('jump')}</NavigationListHeader>
        <NavigationListSection>
          {Object.entries(categorizedContactsRefs).map(([header, ref]) => (
            <ListItem
              key={`jump-${header}`}
              button
              onClick={() => jumpToHeader(ref)}
            >
              <ListItemText primary={header} />
            </ListItem>
          ))}
        </NavigationListSection>
      </NavigationList>
      <Table>
        {Object.entries(categorizedContacts).map(([header, contacts]) => (
          <List
            key={`cat-${header}`}
            ref={categorizedContactsRefs[header]}
            tabIndex="-1"
          >
            <ListSubheader key={header} className="categorized-list-header">
              {header}
            </ListSubheader>
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
