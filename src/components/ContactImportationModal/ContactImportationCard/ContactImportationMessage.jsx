import PropTypes from 'prop-types'
import React from 'react'

import styles from '@/styles/contactImportation.styl'

export default function ImportationMessage({ text }) {
  if (text) {
    return <span className={styles['importation-message']}>{text}</span>
  }
}
ImportationMessage.propTypes = {
  text: PropTypes.string
}
ImportationMessage.defaultProps = {
  text: undefined
}
