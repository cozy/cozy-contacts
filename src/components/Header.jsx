import PropTypes from 'prop-types'
import React from 'react'

import styles from '@/styles/contacts.styl'

const Header = ({ left, right }) => (
  <div className={styles['topbar']}>
    <div className={styles['topbar__left']}>{left}</div>
    <div className={styles['topbar__right']}>{right}</div>
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
