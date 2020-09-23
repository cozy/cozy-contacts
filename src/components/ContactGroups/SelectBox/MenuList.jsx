import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

const MenuList = props => {
  const { menuRef, ...selectProps } = props.selectProps

  return <components.MenuList ref={menuRef} {...props} {...selectProps} />
}

export default MenuList
