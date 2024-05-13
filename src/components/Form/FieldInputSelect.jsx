import React, { useState } from 'react'

import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import TextField from 'cozy-ui/transpiled/react/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import CustomLabelDialog from './CustomLabelDialog'
import { FieldInputWrapperPropTypes } from './FieldInputWrapper'
import { makeCustomLabel, makeInitialCustomValue } from './helpers'

const FieldInputSelect = ({ options, name, value, onChange, ...props }) => {
  const { customLabelOptions, ...restProps } = props
  const { t } = useI18n()
  const [openModal, setOpenModal] = useState(false)
  const [customValue, setCustomValue] = useState(() =>
    makeInitialCustomValue(name, value)
  )

  const _options = [
    ...options.map(option => ({
      value: option.value,
      label: t(option.label)
    })),
    ...(customValue
      ? [{ value: customValue, label: makeCustomLabel(customValue, t) }]
      : [])
  ]

  const handleOptionClick = ev => {
    const inputValue = ev.target.dataset?.value || ev.target.value

    // when clicking the same option as previously selected
    if (value === inputValue) {
      if (value === customValue) {
        return setOpenModal(true)
      }
      return
    }
  }

  return (
    <>
      <TextField
        {...restProps}
        select
        name={name}
        value={value}
        options={_options}
        onChange={ev => {
          if (ev.target.value === 'skip') {
            return
          }

          onChange(ev)
        }}
      >
        {_options.map((option, index) => {
          return (
            <MenuItem
              key={`${props.name}-${index}`}
              value={option.value}
              onClick={handleOptionClick}
            >
              {option.label}
            </MenuItem>
          )
        })}
        {!!customLabelOptions && !customValue && (
          <MenuItem value="skip" onClick={() => setOpenModal(true)}>
            {t('custom')}
          </MenuItem>
        )}
      </TextField>
      {openModal && (
        <CustomLabelDialog
          customValue={customValue}
          customLabelOptions={customLabelOptions}
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
