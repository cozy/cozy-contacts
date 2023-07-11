import PropTypes from 'prop-types'
import React from 'react'

const WRAPPER_CLASS = 'importation-card'

export default function ContactImportationCardWrapper({ clickable, children }) {
  if (clickable) {
    return (
      <label className={`${WRAPPER_CLASS} ${WRAPPER_CLASS}-clickable`}>
        {children}
      </label>
    )
  } else {
    return <div className={WRAPPER_CLASS}>{children}</div>
  }
}
ContactImportationCardWrapper.propTypes = {
  clickable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}
