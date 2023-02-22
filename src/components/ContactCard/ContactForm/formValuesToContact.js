import isEqual from 'lodash/isEqual'

import { updateIndexFullNameAndDisplayName } from '../../../helpers/contacts'
import contactToFormValues from './contactToFormValues'

const hasExtendedAddress = addressField => {
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

const createAddress = ({ address, oldContact, t }) => {
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
              type: addressField.addressLabel,
              primary: index === 0
            }
          }
          return oldContactAddress
        })
    : []
}

const formValuesToContact = ({ formValues, oldContact, t }) => {
  const {
    gender,
    givenName,
    familyName,
    phone,
    email,
    address,
    cozy,
    company,
    jobTitle,
    birthday,
    birthplace,
    note
  } = formValues

  const contactWithFormValues = {
    ...oldContact,
    gender: gender || '',
    name: {
      ...oldContact?.name,
      givenName: givenName || '',
      familyName: familyName || ''
    },
    email: email
      ? email
          .filter(val => val && val.email)
          .map(({ email, emailLabel }, index) => ({
            address: email,
            type: emailLabel,
            primary: index === 0
          }))
      : [],
    address: createAddress({ address, oldContact, t }),
    phone: phone
      ? phone
          .filter(val => val && val.phone)
          .map(({ phone, phoneLabel }, index) => ({
            number: phone,
            type: phoneLabel,
            primary: index === 0
          }))
      : [],
    cozy: cozy
      ? [
          {
            url: cozy,
            label: formValues['cozyLabel'],
            primary: true
          }
        ]
      : [],
    company: company || '',
    jobTitle: jobTitle || '',
    birthday: birthday || '',
    birthplace: birthplace || '',
    note: note || '',
    // If we don't create the relationships field manually, cozy-client doesn't create it automatically when needed
    relationships: {
      ...oldContact?.relationships,
      groups: {
        data: []
      }
    },
    metadata: {
      ...oldContact?.metadata,
      version: 1,
      cozy: true
    }
  }

  return updateIndexFullNameAndDisplayName(contactWithFormValues)
}

export default formValuesToContact
