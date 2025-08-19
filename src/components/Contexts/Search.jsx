import React, { useState, useContext } from 'react'

const SearchContext = React.createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  )
}

export default React.memo(SearchProvider)
