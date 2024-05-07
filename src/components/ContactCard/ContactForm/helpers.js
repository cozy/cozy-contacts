import isEqual from 'lodash/isEqual'

import contactToFormValues from './contactToFormValues'

/**
 * @param {object} [item] - Contact attribute
 * @returns {string} Stringified object
 */
export const makeItemLabel = item => {
  if (!item) return undefined

  const res =
    item.label || item.type
      ? JSON.stringify({ type: item.type, label: item.label })
      : undefined

  return res
}

/**
 *
 * @param {string} [itemLabel] - Value of the label for a contact attribute
 * @returns {{ type?: string, label?: string }}
 */
export const makeTypeAndLabel = itemLabel => {
  if (!itemLabel) {
    return { type: undefined, label: undefined }
  }

  const itemLabelObj = JSON.parse(itemLabel)

  const res = { type: itemLabelObj.type, label: itemLabelObj.label }

  return res
}

/**
 * @param {object} addressField
 * @returns {boolean} True if addressField has extended address
 */
export const hasExtendedAddress = addressField => {
  if (!addressField) return false
  const extendedAddressKeys = [
    'addresslocality',
    'addressbuilding',
    'addressstairs',
    'addressfloor',
    'addressapartment',
    'addressentrycode'
  ]
  return Object.keys(addressField).some(ext =>
    extendedAddressKeys.includes(ext)
  )
}

export const moveToHead = shouldBeHead => items =>
  items.reduce((arr, v) => (shouldBeHead(v) ? [v, ...arr] : [...arr, v]), [])

export const movePrimaryToHead = moveToHead(v => v?.primary)

export const createAddress = ({ address, oldContact, t }) => {
  return address
    ? address
        .filter(val => val && val.address)
        .map((addressField, index) => {
          const oldContactAddress = oldContact?.address?.[index]
          const oldContactFormValues = contactToFormValues(oldContact, t)
            ?.address?.[index]

          const addressHasBeenModified = !isEqual(
            addressField,
            oldContactFormValues
          )

          if (addressHasBeenModified) {
            // Use "code" instead "postcode", to be vcard 4.0 rfc 6350 compliant
            // eslint-disable-next-line no-unused-vars
            const { postcode, ...oldContactAddressCleaned } =
              oldContactAddress || {}
            return {
              // For keep other properties form connectors
              ...oldContactAddressCleaned,
              formattedAddress: addressField.address,
              number: addressField.addressnumber,
              street: addressField.addressstreet,
              code: addressField.addresscode,
              city: addressField.addresscity,
              region: addressField.addressregion,
              country: addressField.addresscountry,
              ...(hasExtendedAddress(addressField) && {
                extendedAddress: {
                  ...oldContactAddressCleaned.extendedAddress,
                  locality: addressField.addresslocality,
                  building: addressField.addressbuilding,
                  stairs: addressField.addressstairs,
                  floor: addressField.addressfloor,
                  apartment: addressField.addressapartment,
                  entrycode: addressField.addressentrycode
                }
              }),
              ...makeTypeAndLabel(addressField.addressLabel),
              primary: index === 0
            }
          }
          return oldContactAddress
        })
    : []
}
