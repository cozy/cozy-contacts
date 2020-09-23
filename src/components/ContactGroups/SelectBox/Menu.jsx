import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

import ContactGroupCreation from '../ContactGroupCreation'

const Menu = props => {
  const { children } = props
  const { createGroup, toggleMenu, ...selectProps } = props.selectProps

  return (
    <components.Menu {...props} selectProps={selectProps}>
      {children}
      <ContactGroupCreation createGroup={createGroup} toggleMenu={toggleMenu} />
    </components.Menu>
  )
}

export default Menu
