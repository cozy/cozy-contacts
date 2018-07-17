import React from 'react'
import PropTypes from 'prop-types'

const IntentMain = ({ children }) => (
  <div className="intent-main">{children}</div>
)
IntentMain.propTypes = {
  children: PropTypes.element.isRequired
}

export default IntentMain
