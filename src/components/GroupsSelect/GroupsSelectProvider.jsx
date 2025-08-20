import React, { useContext, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { translatedDefaultSelectedGroup } from './helpers'

const SelectedGroupContext = React.createContext()

export const useSelectedGroup = () => {
  const context = useContext(SelectedGroupContext)

  if (!context) {
    throw new Error(
      'useSelectedGroup must be used within a SelectedGroupProvider'
    )
  }
  return context
}

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

export default SelectedGroupProvider
