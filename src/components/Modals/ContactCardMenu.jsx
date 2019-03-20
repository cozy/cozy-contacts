import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Menu, MenuItem, Button } from 'cozy-ui/transpiled/react'

const ContactCardMenu = ({ deleteAction }) => (
  <Menu
    position="right"
    className="u-mr-half"
    component={
      <Button
        theme="secondary"
        extension="narrow"
        icon="dots"
        className="fix-c-btn"
        iconOnly
        label={deleteAction.label}
        size="small"
      />
    }
  >
    <MenuItem
      className="menu__item--danger"
      icon={<Icon icon="delete" />}
      onSelect={deleteAction.action}
    >
      {deleteAction.label}
    </MenuItem>
  </Menu>
)
ContactCardMenu.propTypes = {
  deleteAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
}

export default ContactCardMenu
