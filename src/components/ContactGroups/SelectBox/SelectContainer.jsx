import React from 'react'
import classNames from 'classnames'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const SelectContainer = props => {
  return (
    <components.SelectContainer
      {...props}
      className={classNames(props.className, 'react-select__custom__container')}
    />
  )
}

export default SelectContainer
