import React from 'react'
import PropTypes from 'prop-types'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const ControlDefault = ({ selectProps: { toggleMenu }, ...props }) => {
  return (
    <div onClick={toggleMenu}>
      <components.Control {...props} />
    </div>
  )
}

ControlDefault.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default ControlDefault
