import React, { createContext, useState } from 'react'

const ScrollToCategoryContext = createContext()

const ScrollToCategoryProvider = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const contextValue = { isScrolling, setIsScrolling }

  return (
    <ScrollToCategoryContext.Provider value={contextValue}>
      {children}
    </ScrollToCategoryContext.Provider>
  )
}

export default ScrollToCategoryContext

export { ScrollToCategoryProvider }
