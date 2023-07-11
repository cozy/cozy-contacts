import React, { createContext, useMemo, useState } from 'react'

const ContactsDiplayedContext = createContext()

const ContactsDiplayedProvider = ({ children }) => {
  const [contactsDisplayed, setContactsDisplayed] = useState([])
  const contextValue = useMemo(() => {
    return { contactsDisplayed, setContactsDisplayed }
  }, [contactsDisplayed])

  return (
    <ContactsDiplayedContext.Provider value={contextValue}>
      {children}
    </ContactsDiplayedContext.Provider>
  )
}

export default ContactsDiplayedContext

export { ContactsDiplayedProvider }
