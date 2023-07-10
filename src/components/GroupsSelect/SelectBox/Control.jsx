import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import BottomSelectIcon from 'cozy-ui/transpiled/react/Icons/BottomSelect'

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
