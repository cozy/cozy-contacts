import {
  updateIndexFullNameAndDisplayName,
  getFormattedAddress
} from '../../../helpers/contacts'

const createAddress = ({ address, oldContact, t }) => {
  return address
    ? address
        .filter(val => val && val.address)
        .map((addressField, index) => {
          const formattedAddress = addressField.address
          const oldContactAddress = oldContact?.address?.[index]
          const oldContactFormattedAddress =
            (oldContactAddress && getFormattedAddress(oldContactAddress, t)) ||
            ''
          const addressHasBeenModified =
            formattedAddress !== oldContactFormattedAddress

          if (addressHasBeenModified) {
            return {
              formattedAddress: addressField.address,
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
