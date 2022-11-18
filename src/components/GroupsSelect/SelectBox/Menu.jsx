import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'
import Typography from 'cozy-ui/transpiled/react/Typography'

import GroupCreation from '../GroupCreation'

const Menu = props => {
  const { children } = props
  const { createGroup, ...selectProps } = props.selectProps

  return (
    <components.Menu {...props} selectProps={selectProps}>
      <Typography variant="body1" component="div">
        {children}
        <GroupCreation createGroup={createGroup} />
      </Typography>
    </components.Menu>
  )
}

export default Menu
