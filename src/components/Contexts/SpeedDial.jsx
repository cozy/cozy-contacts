import React, { createContext, useState } from 'react'

const SpeedDialContext = createContext()

const SpeedDialProvider = ({ children }) => {
  const [speedDialValue, setSpeedDialValue] = useState('')
  const contextValue = { speedDialValue, setSpeedDialValue }

  return (
    <SpeedDialContext.Provider value={contextValue}>
      {children}
    </SpeedDialContext.Provider>
  )
}

export default SpeedDialContext

export { SpeedDialProvider }
