import merge from 'lodash/merge'
import { updateIndexFullNameAndDisplayName } from '../../../helpers/contacts'

const formValuesToContact = (data, oldContact) => {
  const {
    givenName,
    familyName,
    phone,
    email,
    address,
    cozy,
    company,
    jobTitle,
    birthday,
    note
  } = data

  const contactWithFormValues = {
    name: {
      givenName,
      familyName
    },
    email: email
      .filter(val => val && val.email)
      .map(({ email, emailLabel }, index) => ({
        address: email,
        type: emailLabel,
        primary: index === 0
      })),
    address:
      address &&
      address
        .filter(val => val && val.address)
        .map(({ address, addressLabel }, index) => ({
          formattedAddress: address,
          type: addressLabel,
          primary: index === 0
        })),
    phone:
      phone &&
      phone
        .filter(val => val && val.phone)
        .map(({ phone, phoneLabel }, index) => ({
          number: phone,
          type: phoneLabel,
          primary: index === 0
        })),
    cozy: cozy
      ? [
          {
            url: cozy,
            label: data['cozyLabel'],
            primary: true
          }
        ]
      : [],
    company: company || '',
    jobTitle: jobTitle || '',
    birthday,
    note: note || '',
    // If we don't create the relationships field manually, cozy-client doesn't create it automatically when needed
    relationships: {
      groups: {
        data: []
      }
    },
    metadata: {
      version: 1,
      cozy: true
    }
  }

  return updateIndexFullNameAndDisplayName(
    merge({ ...oldContact }, contactWithFormValues)
  )
}

export default formValuesToContact
