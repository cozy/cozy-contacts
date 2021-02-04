import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Typography from 'cozy-ui/transpiled/react/Typography'

const ContactName = ({ displayName, familyName }) => {
  const namesToDisplay = (displayName && displayName.split(' ')) || []
  return (
    <Typography className="u-ml-1" variant="body1" noWrap gutterBottom inline>
      {namesToDisplay.map((name, key) => (
        <span
          key={`display-${key}`}
          className={cx({ 'u-fw-bold': name === familyName })}
        >
          {name}
          &nbsp;
        </span>
      ))}
    </Typography>
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
