import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'
import Link from 'cozy-ui/transpiled/react/Link'
import ActionMenu, {
  ActionMenuItem
} from 'cozy-ui/transpiled/react/deprecated/ActionMenu'
import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { getFilteredStoreUrl } from '../../helpers/store'

const ImportDropdown = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const anchorRef = useRef()
  const [menuDisplayed, setMenuDisplayed] = useState(false)
  const showMenu = () => setMenuDisplayed(true)
  const hideMenu = () => setMenuDisplayed(false)

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

          <AppLinker app={{ slug: 'store' }} href={getFilteredStoreUrl(client)}>
            {({ onClick, href }) => (
              <ActionMenuItem
                left={<AppIcon app="store" className="u-h-1 u-w-1" />}
                onClick={onClick}
              >
                <Link className="u-p-0" href={href}>
                  {t('import.store')}
                </Link>
              </ActionMenuItem>
            )}
          </AppLinker>
        </ActionMenu>
      )}
    </>
  )
}

export default ImportDropdown
