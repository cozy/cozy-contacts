import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ left, right, letters }) => (
  <section className="filters">
    <div className="topbar">
      <div className="topbar__left">{left}</div>
      <div className="topbar__right">{right}</div>
    </div>
    <div className="filters__letters">{letters}</div>
  </section>
)

Header.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
  letters: PropTypes.element
}

Header.defaultProps = {
  left: <div />,
  right: <div />,
  letters: <div />
}

export default Header
