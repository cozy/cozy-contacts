import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ left, right, bottom }) => (
  <div className="topbar">
    <div className="topbar__top">
      <div className="topbar__left">{left}</div>
      <div className="topbar__right">{right}</div>
    </div>
    <div className="topbar__bottom">{bottom}</div>
  </div>
)

Header.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
  bottom: PropTypes.element
}

Header.defaultProps = {
  left: <div />,
  right: <div />,
  bottom: <div />
}

export default Header
