import React from 'react'
import PropTypes from 'prop-types'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const ControlDefault = ({ selectProps: { toggleMenu }, ...props }) => {
  // onTouchStart is necessary on mobile
  // see https://github.com/JedWatson/react-select/issues/3806#issuecomment-541325710
  // TODO : To be deleted when cozy-ui will be able to handle this case.
  // see https://github.com/cozy/cozy-ui/issues/1593
  return (
    <div
      onClick={toggleMenu}
      onTouchStart={toggleMenu}
      data-testid="selectBox-controlDefault"
    >
      <components.Control {...props} />
    </div>
  )
}

ControlDefault.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default ControlDefault
