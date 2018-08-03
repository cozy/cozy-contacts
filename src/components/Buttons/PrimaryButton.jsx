import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'cozy-ui/react'

const PrimaryButton = ({ className, onClick, icon, children, ...props }) => (
  <div>
    <Button
      className={className}
      onClick={onClick}
      label={children}
      icon={icon}
      {...props}
    />
  </div>
)

PrimaryButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.any,
  children: PropTypes.string.isRequired
}
PrimaryButton.defaultProps = {
  className: '',
  onClick: () => {},
  icon: null
}

export default PrimaryButton
