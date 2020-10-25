import React, { createContext, useState } from 'react'

const SelectedFirstLetterContext = createContext()

const SelectedFirstLetterProvider = ({ children }) => {
  const [selectedFirstLetter, setSelectedFirstLetter] = useState(null)
  const contextValue = { selectedFirstLetter, setSelectedFirstLetter }

  return (
    <SelectedFirstLetterContext.Provider value={contextValue}>
      {children}
    </SelectedFirstLetterContext.Provider>
  )
}

export default SelectedFirstLetterContext

export { SelectedFirstLetterProvider }
