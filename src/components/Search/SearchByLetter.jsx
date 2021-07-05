import React, { useCallback, useContext, useMemo } from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import SearchByLetterContext from '../Contexts/SearchByLetter'

const SearchByLetter = ({ letters }) => {
  const { t } = useI18n()
  const { setSearchByLetterValue } = useContext(SearchByLetterContext)

  const handleClick = useCallback(
    letter => {
      setSearchByLetterValue(letter)
    },
    [setSearchByLetterValue]
  )

  const alphabet = useMemo(
    () =>
      [...Array(26).keys(), t('empty-list')].map(key =>
        typeof key === 'number' ? String.fromCharCode(key + 97) : key
      ),
    [t]
  )

  return (
    <div className="search-letter-wrapper">
      {alphabet.map(letter => (
        <Button
          key={letter}
          data-value={letter}
          label={letter}
          disabled={!letters.includes(letter)}
          onClick={() => handleClick(letter)}
        />
      ))}
    </div>
  )
}

export default SearchByLetter
