import cx from 'classnames'
import React, { useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import TextField from 'cozy-ui/transpiled/react/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

import CustomLabelDialog from './CustomLabelDialog'
import { FieldInputWrapperPropTypes } from './FieldInputWrapper'
import { makeCustomLabel, makeInitialCustomValue } from './helpers'

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

const FieldInputSelect = ({
  options,
  withAddLabel,
  name,
  value,
  onChange,
  ...props
}) => {
  const { t } = useI18n()
  const [openModal, setOpenModal] = useState(false)
  const [customValue, setCustomValue] = useState(() =>
    makeInitialCustomValue(name, value)
  )

  return (
    <>
      <TextField
        {...props}
        select
        SelectProps={{ IconComponent: CustomSelectIcon }}
        name={name}
        value={value}
        onChange={ev => {
          if (ev.target.value === 'skip') {
            return
          }

          onChange(ev)
        }}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={`${props.name}-${index}`} value={option.value}>
              {t(option.label)}
            </MenuItem>
          )
        })}
        {customValue && (
          <MenuItem value={customValue}>
            {makeCustomLabel(customValue, t)}
          </MenuItem>
        )}
        {withAddLabel && (
          <MenuItem
            value="skip"
            onClick={() => {
              setOpenModal(true)
            }}
          >
            {t('custom')}
          </MenuItem>
        )}
      </TextField>
      {openModal && (
        <CustomLabelDialog
          customValue={customValue}
          setCustomValue={setCustomValue}
          onSubmit={onChange}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  )
}

FieldInputSelect.prototype = FieldInputWrapperPropTypes

export default FieldInputSelect
