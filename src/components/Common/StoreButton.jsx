import React from 'react'

import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { getFilteredStoreUrl } from '../../helpers/store'

const StoreButton = () => {
  const client = useClient()
  const { t } = useI18n()
  const appStoreUrl = getFilteredStoreUrl(client)

  return (
    <Button
      component="a"
      href={appStoreUrl}
      label={t('empty.import_store')}
      variant="secondary"
      startIcon={<AppIcon app="store" className="u-h-1 u-w-1 u-mr-half" />}
      fullWidth
    />
  )
}

export default StoreButton
