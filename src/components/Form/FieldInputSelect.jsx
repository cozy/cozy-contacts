import cx from 'classnames'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import TextField from 'cozy-ui/transpiled/react/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

import { FieldInputWrapperPropTypes } from './FieldInputWrapper'

const styles = makeStyles({
  selectIcon: {
    top: 'auto',
    marginRight: '0.5rem'
  }
})
const CustomSelectIcon = ({ className, ...props }) => {
  const classes = styles()
  return (
    <Icon
      className={cx(className, classes.selectIcon)}
      {...props}
      icon={BottomIcon}
    />
  )
}
const FieldInputSelect = ({ options, ...props }) => {
  const { t } = useI18n()

  return (
    <TextField
      {...props}
      select
      SelectProps={{ IconComponent: CustomSelectIcon }}
    >
      {options.map((option, index) => {
        return (
          <MenuItem key={`${props.name}-${index}`} value={option.value}>
            {t(option.label)}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

FieldInputSelect.prototype = FieldInputWrapperPropTypes

export default FieldInputSelect
