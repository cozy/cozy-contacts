import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ImportDropdown from './Common/ImportDropdown'

const Toolbar = () => {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <>
      <Button
        className="u-mr-half"
        startIcon={<Icon icon={PlusIcon} />}
        label={t('create')}
        fullWidth
        onClick={() => navigate('/new')}
      />
      <ImportDropdown />
    </>
  )
}

export default Toolbar
