import React from 'react'
import PropTypes from 'prop-types'

const ContactLetterNav = ({ letters, executeScroll }) => {
  letters.splice(letters.findIndex(letter => letter === 'EMPTY'), 1)
  return (
    <ul className="ContactLetterNav">
      {letters.map((letter, i) => {
        return (
          <li
            key={i}
            onClick={() => executeScroll(letter)}
            className="ContactLetterNav-letter"
          >
            {letter}
          </li>
        )
      })}
    </ul>
  )
}

ContactLetterNav.prototype = {
  letters: PropTypes.array.isRequired,
  executeScroll: PropTypes.func
}

export default ContactLetterNav
