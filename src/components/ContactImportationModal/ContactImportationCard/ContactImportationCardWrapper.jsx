import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from '@/styles/contactImportation.styl'

export default function ContactImportationCardWrapper({ clickable, children }) {
  if (clickable) {
    return (
      <label
        className={cx(
          styles['importation-card'],
          styles['importation-card-clickable']
        )}
      >
        {children}
      </label>
    )
  } else {
    return <div className={styles['importation-card']}>{children}</div>
  }
}
ContactImportationCardWrapper.propTypes = {
  clickable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}
