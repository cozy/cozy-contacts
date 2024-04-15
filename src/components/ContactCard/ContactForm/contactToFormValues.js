import { fields } from './fieldsConfig'
import { getFormattedAddress } from '../../../helpers/contacts'

export const moveToHead = shouldBeHead => items =>
  items.reduce((arr, v) => (shouldBeHead(v) ? [v, ...arr] : [...arr, v]), [])

const movePrimaryToHead = moveToHead(v => v.primary)

/**
 *
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

const contactToFormValues = (contact, t) => {
  // initialize the form values, required so that array fields start with at least one editable field
  const initialFieldValues = fields.reduce(
    (initialValues, { name, isArray }) => {
      initialValues[name] = isArray ? [undefined] : undefined
      return initialValues
    },
    {}
  )

  if (contact) {
    const {
      gender,
      address,
      birthday,
      birthplace,
      company,
      jobTitle,
      cozy,
      email,
      name,
      note,
      phone
    } = contact

    const addressValue =
      address && address.length > 0
        ? movePrimaryToHead(address).map(addressInfo => ({
            address: getFormattedAddress(addressInfo, t),
            addressnumber: addressInfo.number,
            addressstreet:
              addressInfo.street || getFormattedAddress(addressInfo, t),
            addresscode: addressInfo.postcode || addressInfo.code,
            addresscity: addressInfo.city,
            addressregion: addressInfo.region,
            addresscountry: addressInfo.country,
            addresslocality: addressInfo.extendedAddress?.locality,
            addressbuilding: addressInfo.extendedAddress?.building,
            addressstairs: addressInfo.extendedAddress?.stairs,
            addressfloor: addressInfo.extendedAddress?.floor,
            addressapartment: addressInfo.extendedAddress?.apartment,
            addressentrycode: addressInfo.extendedAddress?.entrycode,
            addressLabel: makeItemLabel(addressInfo)
          }))
        : [undefined]
    const cozyValue = cozy && cozy.length > 0 ? cozy[0].url : undefined
    const cozyLabel =
      cozy && cozy.length > 0 ? makeItemLabel(cozy[0]) : undefined
    const emailValue =
      email && email.length > 0
        ? movePrimaryToHead(email).map(item => ({
            email: item.address,
            emailLabel: makeItemLabel(item)
          }))
        : [undefined]
    const phoneValue =
      phone && phone.length > 0
        ? movePrimaryToHead(phone).map(item => ({
            phone: item.number,
            phoneLabel: makeItemLabel(item)
          }))
        : [undefined]

    return {
      gender,
      givenName: name?.givenName,
      additionalName: name?.additionalName,
      surname: name?.surname,
      familyName: name?.familyName,
      phone: phoneValue,
      email: emailValue,
      address: addressValue,
      cozy: cozyValue,
      cozyLabel: cozyLabel,
      company,
      jobTitle,
      birthday,
      birthplace,
      note
    }
  }

  return initialFieldValues
}

export default contactToFormValues
