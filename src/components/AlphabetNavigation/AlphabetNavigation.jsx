import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { get } from 'lodash'
import PropTypes from 'prop-types'

const AlphabetNavigation = ({ contacts, current, onNavigate }) => {
  const [firstLetters, setFirstLetters] = useState([])

  useEffect(
    () => {
      setFirstLetters(
        contacts
          .map(contact => {
            return get(contact, 'name.familyName', null)
          })
          .filter(familyName => !!familyName)
          .map(familyName => {
            return familyName.charAt(0).toUpperCase()
          })
      )
    },
    [contacts]
  )

  const alphabet = [...Array(26)].map((_, i) => {
    const letter = String.fromCharCode(i + 65)
    return {
      letter,
      isActive: letter === current,
      isDisabled: !firstLetters.includes(letter)
    }
  })

  return (
    <div className="alphabet-navigation">
      {alphabet.map(({ letter, isActive, isDisabled }) => (
        <div
          key={letter}
          className={cx('alphabet-letter', { active: isActive })}
        >
          <IconButton
            color="primary"
            size="small"
            disabled={isDisabled}
            onClick={() => onNavigate(letter === current ? null : letter)}
          >
            {letter}
          </IconButton>
        </div>
      ))}
    </div>
  )
}

AlphabetNavigation.propTypes = {
  contacts: PropTypes.array.isRequired,
  current: PropTypes.string,
  onNavigate: PropTypes.func.isRequired
}

export default AlphabetNavigation
