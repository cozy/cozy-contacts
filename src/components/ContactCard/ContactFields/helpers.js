import { makeCustomLabel } from '../../Form/helpers'

const makeCustomOrSupportedLabel = ({ type, value, hasPrefix, t }) => {
  if (value.type) {
    return makeCustomLabel(JSON.stringify(value), t)
  }

  if (value.label) {
    return hasPrefix
      ? t(`label.${type}.${value.label}`)
      : t(`label.${value.label}`)
  }

  return null
}

/**
 * Returns a tranlated label
 * @param {object} params
 * @param {string} params.type
 * @param {{type:string, label?:string}} params.value - Values of a contact attribute
 * @param {func} params.t
 * @param {func} params.polyglot
 * @returns {string|null}
 */
export const makeTLabel = ({ type, value, t, polyglot }) => {
  const hasPrefix = ['phone', 'address'].includes(type)

  if (hasPrefix) {
    if (type === 'phone') {
      const keyToTranslate = `label.${type}.${value.type}-${value.label}`

      return polyglot.has(keyToTranslate)
        ? t(keyToTranslate)
        : makeCustomLabel(JSON.stringify(value), t)
    }

    // has prefix but is not phone
    return makeCustomOrSupportedLabel({ type, value, hasPrefix, t })
  }

  // has no prefix
  return makeCustomOrSupportedLabel({ type, value, hasPrefix, t })
}
