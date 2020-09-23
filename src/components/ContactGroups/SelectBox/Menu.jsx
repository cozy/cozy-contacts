import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'

import ContactGroupCreation from '../ContactGroupCreation'

const Menu = props => {
  const { children } = props
  const { createGroup, toggleMenuIsOpen, ...selectProps } = props.selectProps

  return (
    <components.Menu {...props} selectProps={selectProps}>
      {children}
      <ContactGroupCreation
        createGroup={createGroup}
        toggleMenuIsOpen={toggleMenuIsOpen}
      />
    </components.Menu>
  )
}

export default Menu
