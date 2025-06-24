import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PersonAddIcon from 'cozy-ui/transpiled/react/Icons/PersonAdd'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ImportDropdown from './Common/ImportDropdown'

const Toolbar = () => {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <>
      <Button
        className="u-mr-half"
        variant="ghost"
        startIcon={<Icon icon={PersonAddIcon} />}
        label={t('create')}
        fullWidth
        onClick={() => navigate('/new')}
      />
      <ImportDropdown />
    </>
  )
}

export default Toolbar
