import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const Control = ({ selectProps: { onControlClicked } }) => {
  const { t } = useI18n()

  return (
    <Button
      theme="secondary"
      size="small"
      label={t('groups.manage')}
      onClick={onControlClicked}
    >
      <Icon
        icon="bottom-select"
        color={palette['coolGrey']}
        width="12"
        className="group-manager__indicator"
      />
    </Button>
  )
}

Control.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default Control
