import cx from 'classnames'
import React from 'react'

import { components } from 'cozy-ui/transpiled/react/SelectBox'
import Typography from 'cozy-ui/transpiled/react/Typography'

import GroupCreation from '../GroupCreation'

import styles from '@/components/GroupsSelect/SelectBox/styles.styl'

const Menu = ({ children, selectProps, className, ...props }) => {
  const { createGroup, ...restSelectProps } = selectProps

  return (
    <components.Menu
      {...props}
      className={cx(className, styles['menu'])}
      selectProps={restSelectProps}
    >
      <Typography variant="body1" component="div">
        {children}
        <GroupCreation createGroup={createGroup} />
      </Typography>
    </components.Menu>
  )
}

export default Menu
