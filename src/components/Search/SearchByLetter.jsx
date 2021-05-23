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
    () => [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      t('empty-list')
    ],
    [t]
  )

  return (
    <div className="search-letter-wrapper">
      {alphabet.map(letter => (
        <Button
          key={letter}
          data-value={letter}
          label={letter}
          disabled={letters.includes(letter) ? false : true}
          onClick={() => handleClick(letter)}
        />
      ))}
    </div>
  )
}

export default SearchByLetter
