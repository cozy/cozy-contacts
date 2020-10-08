import React, { createContext, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { translatedDefaultSelectedGroup } from '../../helpers/groups'

const SelectedGroupContext = createContext()

const SelectedGroupProvider = ({ children }) => {
  const { t } = useI18n()
  const [selectedGroup, setSelectedGroup] = useState(
    translatedDefaultSelectedGroup(t)
  )

  const contextValue = {
    selectedGroup,
    setSelectedGroup
  }

  return (
    <SelectedGroupContext.Provider value={contextValue}>
      {children}
    </SelectedGroupContext.Provider>
  )
}

export default SelectedGroupContext

export { SelectedGroupProvider }
