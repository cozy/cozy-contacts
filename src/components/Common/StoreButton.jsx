import React from 'react'

import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ButtonLink } from 'cozy-ui/transpiled/react/deprecated/Button'

import { getFilteredStoreUrl } from '../../helpers/store'

const StoreButton = () => {
  const client = useClient()
  const { t } = useI18n()
  const appStoreUrl = getFilteredStoreUrl(client)

  return (
    <ButtonLink
      href={appStoreUrl}
      label={t('empty.import_store')}
      theme="secondary"
      icon={<AppIcon app="store" className="u-h-1 u-w-1 u-mr-half" />}
      extension="full"
    />
  )
}

export default StoreButton
