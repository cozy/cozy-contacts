import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'

import { Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import SelectedGroupContext from './Contexts/SelectedGroup'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsList from './ContactsList/ContactsList.jsx'
import GroupsSelect from './GroupsSelect/GroupsSelect'
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup
} from '../helpers/groups'

const setCustomStyles = isMobile => ({
  container: base => ({
    ...base,
    ...(!isMobile && { width: '24rem' })
  }),
  noOptionsMessage: base => ({ ...base, textAlign: 'left' })
})

const setOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups

export const ContentResult = ({ contacts, allGroups }) => {
  const { t } = useI18n()
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext)
  const { isMobile } = useBreakpoints()

  const customStyles = setCustomStyles(isMobile)
  const options = setOptions(allGroups, translatedDefaultSelectedGroup(t))
  const filteredContactsByGroup = filterContactsByGroup(contacts, selectedGroup)

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <GroupsSelect
              allGroups={options}
              value={selectedGroup}
              onChange={setSelectedGroup}
              noOptionsMessage={() => t('filter.no-group')}
              styles={customStyles}
            />
          }
          right={<Toolbar />}
        />
      )}
      <Content>
        <ContactsList contacts={filteredContactsByGroup} />
      </Content>
    </>
  )
}

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContentResult
