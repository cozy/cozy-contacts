import React from "react";

export const ContactsContext = React.createContext({
  refs: {}
});

export const ContactsContextProvider = ({ children }) => {
  const [selectedLetter, setSelectedLetter] = React.useState(null);
  return (
    <ContactsContext.Provider value={{ selectedLetter, setSelectedLetter }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContext;
