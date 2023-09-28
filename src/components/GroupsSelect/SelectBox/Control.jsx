import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomSelectIcon from 'cozy-ui/transpiled/react/Icons/BottomSelect'
import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import palette from 'cozy-ui/transpiled/react/palette'
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
        theme="secondary"
        size="small"
        onClick={onControlClicked}
        onTouchStart={onControlClicked}
        label={t('groups.manage')}
        icon={
          <Icon
            icon={BottomSelectIcon}
            color={palette['coolGrey']}
            width="12"
            className="group-manager__indicator"
          />
        }
      />
    </div>
  )
}

Control.propTypes = {
  selectProps: PropTypes.object.isRequired
}

export default Control
