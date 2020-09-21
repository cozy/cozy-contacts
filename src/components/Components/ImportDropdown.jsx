import React, { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ActionMenu, { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Button from 'cozy-ui/transpiled/react/Button'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

import withModal from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal'
import { getFilteredStoreUrl } from '../../helpers/store'

const ImportDropdown = ({ showModal, hideModal }) => {
  const { t } = useI18n()
  const client = useClient()
  const anchorRef = useRef()
  const [menuDisplayed, setMenuDisplayed] = useState(false)
  const showMenu = () => setMenuDisplayed(true)
  const hideMenu = () => setMenuDisplayed(false)

  const showContactImportationModal = () => {
    showModal(<ContactImportationModal closeAction={hideModal} />)
  }

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
          icon="team"
        >
          <Icon className="u-ml-half" icon="bottom" />
        </Button>
      </span>
      {menuDisplayed && (
        <ActionMenu
          anchorElRef={anchorRef}
          popperOptions={{ placement: 'bottom' }}
          onClose={hideMenu}
        >
          <ActionMenuItem
            left={<Icon icon="team" />}
            onClick={showContactImportationModal}
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

ImportDropdown.propTypes = {
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default withModal(ImportDropdown)
