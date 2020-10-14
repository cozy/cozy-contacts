import React, { createContext, useState } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  const contextValue = { searchValue, setSearchValue }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext

export { SearchProvider }
