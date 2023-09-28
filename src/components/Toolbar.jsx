import React from 'react'
import { useNavigate } from 'react-router-dom'

import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ImportDropdown from './Common/ImportDropdown'

const style = { pointerEvents: 'all' }

const Toolbar = () => {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <div className="actions">
      <Buttons
        onClick={() => navigate('/new')}
        startIcon={<Icon icon={PlusIcon} />}
        label={t('create_contact')}
        style={style}
        className="u-mr-half"
      />
      <ImportDropdown />
    </div>
  )
}

export default Toolbar
