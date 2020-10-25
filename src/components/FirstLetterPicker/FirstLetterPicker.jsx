import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import React, { useContext } from 'react'
import SelectedFirstLetterContext from '../Contexts/SelectedFirstLetter'
import Button from 'cozy-ui/transpiled/react/Button'

import '../../styles/firstLetterPicker.styl'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const FirstLetterPicker = () => {
  const { t } = useI18n()
  const { selectedFirstLetter, setSelectedFirstLetter } = useContext(
    SelectedFirstLetterContext
  )

  return (
    <nav className="first-letter-picker">
      <Button
        data-testid="letter-filter-none"
        label={t('all')}
        onClick={() => setSelectedFirstLetter(null)}
        size="large"
        subtle
        style={{ padding: '0 8px' }}
        theme={selectedFirstLetter ? 'secondary' : null}
      />
      {LETTERS.map(letter => (
        <Button
          data-testid={`letter-filter-${letter}`}
          key={letter}
          label={letter}
          onClick={() => setSelectedFirstLetter(letter)}
          size="large"
          subtle
          style={{ padding: '0 8px' }}
          theme={selectedFirstLetter === letter ? null : 'secondary'}
        />
      ))}
    </nav>
  )
}

export default FirstLetterPicker
