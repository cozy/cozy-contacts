import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ContactName = ({ displayName, familyName }) => {
  const namesToDisplay = (displayName && displayName.split(' ')) || []
  return (
    <div className="u-ellipsis u-ml-1">
      {namesToDisplay.map((name, key) => (
        <span
          key={`display-${key}`}
          className={cx({ 'u-fw-bold': name === familyName })}
        >
          {name}
          &nbsp;
        </span>
      ))}
    </div>
  )
}

ContactName.propTypes = {
  displayName: PropTypes.string,
  familyName: PropTypes.string
}
ContactName.defaultProps = {
  displayName: ''
}

export default ContactName
