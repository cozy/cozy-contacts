import React from 'react'
import PropTypes from 'prop-types'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Icon, Menu, MenuItem, Button } from 'cozy-ui/transpiled/react'

const ContactCardMenu = ({ editAction, deleteAction, t }) => (
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
        label={t('menu')}
        size="small"
      />
    }
  >
    <MenuItem icon={<Icon icon="pen" />} onSelect={editAction.action}>
      {editAction.label}
    </MenuItem>
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
  }).isRequired,
  editAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
}

export default translate()(ContactCardMenu)
