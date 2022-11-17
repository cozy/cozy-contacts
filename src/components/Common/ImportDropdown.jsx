import React, { useState, useRef } from 'react'

import { useClient } from 'cozy-client'
import { useNavigate } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ActionMenu, { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Button from 'cozy-ui/transpiled/react/Button'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import { getFilteredStoreUrl } from '../../helpers/store'

const ImportDropdown = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const anchorRef = useRef()
  const [menuDisplayed, setMenuDisplayed] = useState(false)
  const showMenu = () => setMenuDisplayed(true)
  const hideMenu = () => setMenuDisplayed(false)

  const goToStore = () => {
    window.location = getFilteredStoreUrl(client)
  }

  return (
    <>
      <span ref={anchorRef}>
        <Button
          onClick={showMenu}
          label={t('import.title')}
          theme="secondary"
          icon={TeamIcon}
          className="u-m-0"
        >
          <Icon className="u-ml-half" icon={BottomIcon} />
        </Button>
      </span>
      {menuDisplayed && (
        <ActionMenu
          anchorElRef={anchorRef}
          popperOptions={{ placement: 'bottom' }}
          onClose={hideMenu}
        >
          <ActionMenuItem
            left={<Icon icon={TeamIcon} />}
            onClick={() => navigate('/import')}
          >
            {t('import.vcard')}
          </ActionMenuItem>
          <ActionMenuItem
            left={<AppIcon app={'store'} className="u-h-1 u-w-1" />}
            onClick={goToStore}
          >
            {t('import.store')}
          </ActionMenuItem>
        </ActionMenu>
      )}
    </>
  )
}

export default ImportDropdown
