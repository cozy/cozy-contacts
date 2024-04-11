export const makeCustomLabel = (value, t) => {
  const { type, label } = JSON.parse(value)

  const firstString = type || ''
  const secondString = label
    ? type
      ? ` (${t(`label.${label}`)})`.toLowerCase()
      : `label.${label}`
    : ''

  return firstString + secondString || null
}

export const makeInitialCustomValue = (name, value) => {
  // gender input doesn't support custom label
  if (!name || !value || name === 'gender') return undefined

  const valueObj = JSON.parse(value)

  // for backwards compatiblity - historically there is only type and no label
  if (valueObj.type && !valueObj.label) {
    return JSON.stringify({ type: valueObj.type })
  }

  // for phone label
  if (name.includes('phoneLabel')) {
    // but unsupported one
    if (!['cell', 'voice', 'fax'].includes(valueObj.type)) {
      return JSON.stringify({ type: valueObj.type, label: valueObj.label })
    }

    // we don't want to create a custom label if supported
    return undefined
  }

  // at this point if label and type are both present, it's a custom label
  if (valueObj.type && valueObj.label) {
    return JSON.stringify({ type: valueObj.type, label: valueObj.label })
  }
}
