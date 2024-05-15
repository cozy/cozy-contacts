import PropTypes from 'prop-types'
import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomSelectIcon from 'cozy-ui/transpiled/react/Icons/BottomSelect'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const Control = ({
  innerRef,
  innerProps,
  selectProps: { onControlClicked }
}) => {
  const { t } = useI18n()

  return (
    <div ref={innerRef} {...innerProps}>
      <Button
        variant="secondary"
        size="small"
        onClick={onControlClicked}
        onTouchStart={onControlClicked}
        label={t('groups.manage')}
        startIcon={<Icon icon={BottomSelectIcon} width="12" />}
      />
    </div>
  )
}

Control.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default Control
