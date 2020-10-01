import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const MenuList = props => {
  const { ...selectProps } = props.selectProps

  return <components.MenuList {...props} {...selectProps} />
}

export default MenuList
