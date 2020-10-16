import React from 'react'
import { PropTypes } from 'prop-types'

const Header = ({ left, right }) => (
  <div className="topbar">
    <div className="topbar__left">{left}</div>
    <div className="topbar__right">{right}</div>
  </div>
)

Header.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element
}

Header.defaultProps = {
  left: <div />,
  right: <div />
}

export default Header
