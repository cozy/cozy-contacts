import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

import GroupCreation from '../GroupCreation'

const Menu = props => {
  const { children } = props
  const { createGroup, ...selectProps } = props.selectProps

  return (
    <components.Menu {...props} selectProps={selectProps}>
      {children}
      <GroupCreation createGroup={createGroup} />
    </components.Menu>
  )
}

export default Menu
