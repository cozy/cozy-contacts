import PropTypes from 'prop-types'
import React from 'react'

const IntentMain = ({ children }) => (
  <div className="intent-main">{children}</div>
)
IntentMain.propTypes = {
  children: PropTypes.element.isRequired
}

export default IntentMain
