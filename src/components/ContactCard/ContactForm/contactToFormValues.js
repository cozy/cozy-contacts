import { fields } from './index'
import { getFormattedAddress } from '../ContactFields'

export const moveToHead = shouldBeHead => items =>
  items.reduce((arr, v) => (shouldBeHead(v) ? [v, ...arr] : [...arr, v]), [])

const movePrimaryToHead = moveToHead(v => v.primary)

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
      address,
      birthday,
      company,
      cozy,
      email,
      name,
      note,
      phone
    } = contact

    const addressValue =
      address && address.length > 0
        ? movePrimaryToHead(address).map(({ type, ...addressInfo }) => ({
            address: getFormattedAddress(addressInfo, t),
            addressLabel: type
          }))
        : [undefined]
    const cozyValue = cozy && cozy.length > 0 ? cozy[0].url : undefined
    const cozyLabel =
      cozy && cozy.length > 0 && cozy[0].label ? cozy[0].label : undefined
    const emailValue =
      email && email.length > 0
        ? movePrimaryToHead(email).map(item => ({
            email: item.address,
            emailLabel: item.type
          }))
        : [undefined]
    const phoneValue =
      phone && phone.length > 0
        ? movePrimaryToHead(phone).map(item => ({
            phone: item.number,
            phoneLabel: item.type
          }))
        : [undefined]

    return {
      givenName: name ? name.givenName : undefined,
      familyName: name ? name.familyName : undefined,
      phone: phoneValue,
      email: emailValue,
      address: addressValue,
      cozy: cozyValue,
      cozyLabel: cozyLabel,
      company,
      birthday,
      note
    }
  }

  return initialFieldValues
}

export default contactToFormValues
