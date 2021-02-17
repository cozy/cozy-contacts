import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'
import Typography from 'cozy-ui/transpiled/react/Typography'

const Menu = props => {
  const { children } = props

  return (
    <components.Menu {...props} selectProps={props.selectProps}>
      <Typography variant="body1">
        {children}
      </Typography>
    </components.Menu>
  )
}

export default Menu
