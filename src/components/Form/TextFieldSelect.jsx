import React from 'react'

import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import TextField from 'cozy-ui/transpiled/react/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { FieldInputWrapperPropTypes } from './fieldInputType'

const TextFieldSelect = ({ options, ...props }) => {
  const { t } = useI18n()

  const _options = [
    ...options.map(option => ({
      ...option,
      label: option.translated ? option.label : t(option.label)
    }))
  ]

  return (
    <TextField {...props}>
      {_options.map((option, index) => {
        return (
          <MenuItem
            key={`${props.name}-${index}`}
            value={option.value}
            onClick={option.onClick}
          >
            {option.label}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

TextFieldSelect.prototype = FieldInputWrapperPropTypes

export default TextFieldSelect
