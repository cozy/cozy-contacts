import React, { createContext, useState } from 'react'
import {useI18n} from "cozy-ui/transpiled/react/I18n";
import {translatedDefaultSelectedLetter} from "../../helpers/groups";


const SelectedLetterContext = createContext()

const SelectedLetterProvider = ({ children }) => {
  const { t } = useI18n()
  const [selectedLetter, setSelectedLetter] = useState(
    translatedDefaultSelectedLetter(t)
  )

  const contextValue = {
    selectedLetter,
    setSelectedLetter
  }

  return (
    <SelectedLetterContext.Provider value={contextValue}>
      {children}
    </SelectedLetterContext.Provider>
  )
}

export default SelectedLetterContext

export { SelectedLetterProvider }
