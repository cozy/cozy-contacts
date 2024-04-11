export const makeTLabel = ({ type, value, t }) => {
  const hasPrefix = ['phone', 'address'].includes(type)
  const label = value.label || null

  if (!label) return null

  if (hasPrefix) {
    if (type === 'phone') {
      if (!value.type) {
        return null
      }

      return t(`label.${type}.${value.type}-${label}`)
    }

    // has prefix but is not phone
    return t(`label.${type}.${label}`)
  }

  // has no prefix
  return t(`label.${label}`)
}
