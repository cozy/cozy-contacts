import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import TextFieldSelect from './TextFieldSelect'
import { makeCustomLabel, makeInitialCustomValue } from './helpers'
import CustomLabelDialog from '../CustomLabelDialog'
import { FieldInputWrapperPropTypes } from '../types'

const TextFieldCustomLabelSelect = ({
  name,
  value,
  options,
  customLabelOptions,
  onChange,
  ...props
}) => {
  const { t } = useI18n()
  const [openModal, setOpenModal] = useState(false)
  const [customValue, setCustomValue] = useState(() =>
    makeInitialCustomValue(name, value)
  )

  const customOption = customValue
    ? [
        {
          value: customValue,
          label: makeCustomLabel(customValue, t),
          translated: true,
          onClick: () => {
            // trigger modal only if customValue is already selected
            if (value === customValue) {
              return setOpenModal(true)
            }
          }
        }
      ]
    : [
        {
          value: 'skip',
          label: 'custom',
          onClick: () => setOpenModal(true)
        }
      ]
  const _options = options.concat(customOption)

  return (
    <>
      <TextFieldSelect
        {...props}
        name={name}
        value={value}
        options={_options}
        onChange={ev => {
          if (ev.target.value === 'skip') {
            return
          }

          onChange(ev)
        }}
      />
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

TextFieldCustomLabelSelect.prototype = FieldInputWrapperPropTypes

export default TextFieldCustomLabelSelect
