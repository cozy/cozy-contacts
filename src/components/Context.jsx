import React, { createContext, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { getDefaultSelectedGroup } from '../helpers/groups'

const ContactsContext = createContext()

const ContextProvider = ({ children }) => {
  const { t } = useI18n()
  const [selectedGroup, setSelectedGroup] = useState(getDefaultSelectedGroup(t))

  const contextValue = {
    selectedGroup,
    setSelectedGroup
  }

  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  )
}

export default ContactsContext

export { ContextProvider }
