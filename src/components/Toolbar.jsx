import React from 'react'

import Buttons from 'cozy-ui/transpiled/react/Buttons'
import { useNavigate } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import Icon from 'cozy-ui/transpiled/react/Icon'

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
