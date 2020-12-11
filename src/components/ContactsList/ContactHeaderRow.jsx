import React from 'react'
import PropTypes from 'prop-types'
import { scrollToElement } from '../../helpers/scrollToElement'

const ContactHeaderRow = props => (
  <div className="divider">
    <div className="divider__header">{props.header}</div>
    <div className="divider__nav">
      {props.letters.map(letter => (
        <button
          key={letter}
          onClick={() => scrollToElement(`CategorizedList-cat-${letter}`)}
          className={`divider__nav__item ${
            props.header === letter ? '-selected' : ''
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  </div>
)

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired,
  letters: PropTypes.arrayOf(PropTypes.string).isRequired
}
export default ContactHeaderRow
