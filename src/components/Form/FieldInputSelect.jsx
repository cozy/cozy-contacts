import React from 'react'
import cx from 'classnames'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import Icon from 'cozy-ui/transpiled/react/Icon'

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
const FieldInputSelect = props => {
  const { t } = useI18n()
  const { selectValue, ...rest } = props

  return (
    <TextField
      {...rest}
      select
      SelectProps={{ IconComponent: CustomSelectIcon }}
    >
      {selectValue.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {t(`gender.${option.label}`)}
        </MenuItem>
      ))}
    </TextField>
  )
}

FieldInputSelect.prototype = FieldInputWrapperPropTypes

export default FieldInputSelect
