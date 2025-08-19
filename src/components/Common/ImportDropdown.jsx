import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient, generateWebLink } from 'cozy-client'
import { CONTACTS_DOCTYPE } from 'cozy-client/dist/models/contact'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'
import Link from 'cozy-ui/transpiled/react/Link'
import ActionMenu, {
  ActionMenuItem
} from 'cozy-ui/transpiled/react/deprecated/ActionMenu'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ImportDropdown = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const anchorRef = useRef()
  const [showMenu, setShowMenu] = useState(false)

  const storeURL = generateWebLink({
    cozyUrl: client.getStackClient().uri,
    hash: `discover/?type=konnector&doctype=${CONTACTS_DOCTYPE}`,
    pathname: '/',
    slug: 'store',
    subDomainType: client.getInstanceOptions().subdomain
  })

  return (
    <>
      <Button
        ref={anchorRef}
        variant="secondary"
        label={t('import.title')}
        endIcon={<Icon icon={BottomIcon} />}
        fullWidth
        onClick={() => setShowMenu(v => !v)}
      />

      {showMenu && (
        <ActionMenu
          anchorElRef={anchorRef}
          popperOptions={{ placement: 'bottom-end' }}
          onClose={() => setShowMenu(false)}
        >
          <ActionMenuItem
            left={<Icon icon={TeamIcon} />}
            onClick={() => navigate('/import')}
          >
            {t('import.vcard')}
          </ActionMenuItem>

          <AppLinker app={{ slug: 'store' }} href={storeURL}>
            {({ onClick, href }) => (
              <ActionMenuItem
                left={<AppIcon app="store" className="u-h-1 u-w-1" />}
                onClick={onClick}
              >
                <Link
                  className="u-p-0"
                  href={href}
                  style={{ color: 'var(--primaryTextColor)' }}
                >
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
