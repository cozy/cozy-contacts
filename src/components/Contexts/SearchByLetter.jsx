import React, { createContext, useState } from 'react'

const SearchByLetterContext = createContext()

const SearchByLetterProvider = ({ children }) => {
  const [searchByLetterValue, setSearchByLetterValue] = useState('')
  const contextValue = { searchByLetterValue, setSearchByLetterValue }

  return (
    <SearchByLetterContext.Provider value={contextValue}>
      {children}
    </SearchByLetterContext.Provider>
  )
}

export default SearchByLetterContext

export { SearchByLetterProvider }
