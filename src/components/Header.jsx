import React from 'react'
import { PropTypes } from 'prop-types'

const Header = props => (
  <div className="topbar">
    <div className="topbar__left" />
    <div className="topbar__right">{props.children}</div>
  </div>
)

Header.propTypes = {
  children: PropTypes.element.isRequired
}

export default Header
