import React from 'react'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const NavByLetter = ({ usedLetters, onClickLetter }) => {
  const { t } = useI18n()

  return (
    <nav aria-label={t('nav_by_letter')} className="letter-nav">
      {alphabet.map(letter => (
        <Button
          key={`${letter}-key`}
          className="u-m-0 u-p-0 u-miw-2"
          onClick={() => onClickLetter(letter)}
          disabled={!usedLetters.includes(letter)}
          size="tiny"
          label={letter}
        />
      ))}
    </nav>
  )
}

export default NavByLetter
