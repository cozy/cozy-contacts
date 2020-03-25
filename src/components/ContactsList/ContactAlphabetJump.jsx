import React from 'react'
import PropTypes from 'prop-types'

const AlphabetJump = ({ headers, scrollTo }) => {
  return (
    <div className="contact-alphabet-wrapper">
      <ol className="contact-alphabet-slider">
        {headers.map(character => {
          if (character !== 'EMPTY') {
            return (
              <li
                className="contact-alphabet-letter"
                key={`char-${character}`}
                onClick={() => scrollTo(character)}
              >
                {character}
              </li>
            )
          }
        })}
      </ol>
    </div>
  )
}

AlphabetJump.propTypes = {
  headers: PropTypes.array.isRequired,
  scrollTo: PropTypes.func.isRequired
}
AlphabetJump.defaultProps = {}

export default AlphabetJump
