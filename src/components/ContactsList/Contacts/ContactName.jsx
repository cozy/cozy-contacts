import React from 'react'
import PropTypes from 'prop-types'

const ContactName = ({ displayName, lastname }) => {
  const namesToDisplay = (displayName && displayName.split(' ')) || []
  return (
    <div className="u-ellipsis u-ml-1">
      {namesToDisplay.map((name, key) => (
        <span key={`display-${key}`}>
          {name === lastname ? (
            <span className={'u-bold'}>{name}</span>
          ) : (
            <span>{name}</span>
          )}
          &nbsp;
        </span>
      ))}
    </div>
  )
}

ContactName.propTypes = {
  displayName: PropTypes.string,
  lastname: PropTypes.string
}
ContactName.defaultProps = {
  displayName: ''
}

export default ContactName
