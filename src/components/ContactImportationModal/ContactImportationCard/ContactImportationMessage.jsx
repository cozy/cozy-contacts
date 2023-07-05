import PropTypes from 'prop-types'
import React from 'react'

export default function ImportationMessage({ text }) {
  if (text) {
    return <span className="importation-message">{text}</span>
  }
}
ImportationMessage.propTypes = {
  text: PropTypes.string
}
ImportationMessage.defaultProps = {
  text: undefined
}
