import React, { createContext, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const ContactsContext = createContext()

const ContextProvider = ({ children }) => {
  const { t } = useI18n()

  const defaultGroup = {
    name: t('filter.all-contacts'),
    withNoAction: true,
    isGroup: false
  }

  const [selectedGroup, setSelectedGroup] = useState(defaultGroup)

  const setSelectedGroupAsDefault = () => {
    setSelectedGroup(defaultGroup)
  }

  const contextValue = {
    selectedGroup,
    setSelectedGroup,
    defaultGroup,
    setSelectedGroupAsDefault
  }

  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  )
}

export default ContactsContext

export { ContextProvider }
