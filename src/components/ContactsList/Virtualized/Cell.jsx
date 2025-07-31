import React, { useRef, useState } from 'react'

import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import ContactIdentity from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactIdentity'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const Cell = ({ row, column, cell, actions }) => {
  const { t } = useI18n()
  const actionsRef = useRef()
  const [showActions, setShowActions] = useState(false)

  if (column.id === 'fullname') {
    return <ContactIdentity contact={row} noWrapper />
  }

  if (column.id === 'actions') {
    if (!actions) {
      return null
    }

    return (
      <>
        <ListItemIcon>
          <IconButton
            ref={actionsRef}
            arial-label={t('menu')}
            onClick={() => setShowActions(true)}
          >
            <Icon icon={DotsIcon} />
          </IconButton>
        </ListItemIcon>
        {showActions && (
          <ActionsMenu
            open
            ref={actionsRef}
            docs={[row]}
            actions={actions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            onClose={() => setShowActions(false)}
          />
        )}
      </>
    )
  }

  return cell
}

export default React.memo(Cell)
