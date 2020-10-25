import React, { useContext } from 'react'
import SelectedFirstLetterContext from '../Contexts/SelectedFirstLetter'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const FirstLetterPicker = () => {
  const { selectedFirstLetter, setSelectedFirstLetter } = useContext(
    SelectedFirstLetterContext
  )

  return (
    <nav>
      <button
        data-testid="letter-filter-none"
        disabled={!selectedFirstLetter}
        onClick={() => setSelectedFirstLetter(null)}
      >
        All
      </button>
      {LETTERS.map(letter => (
        <button
          data-testid={`letter-filter-${letter}`}
          disabled={selectedFirstLetter === letter}
          key={letter}
          onClick={() => setSelectedFirstLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </nav>
  )
}

export default FirstLetterPicker
