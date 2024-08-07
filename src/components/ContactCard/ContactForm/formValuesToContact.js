import {
  removeAsscociatedData,
  removeRelatedContactRelationships,
  createAddress,
  getRelatedContactRelationships,
  makeTypeAndLabel
} from './helpers'
import { updateIndexFullNameAndDisplayName } from '../../../helpers/contacts'

const formValuesToContact = ({ formValues, oldContact, t }) => {
  const {
    gender,
    givenName,
    additionalName,
    surname,
    familyName,
    phone,
    email,
    address,
    cozy,
    company,
    jobTitle,
    birthday,
    birthplace,
    note,
    relatedContact
  } = formValues

  const relatedContactRelationships =
    getRelatedContactRelationships(relatedContact)

  const oldContactCleaned = removeRelatedContactRelationships(
    removeAsscociatedData(oldContact)
  )

  const relationshipsFormValues = {
    ...oldContactCleaned?.relationships,
    ...relatedContactRelationships,
    // If we don't create the relationships field manually, cozy-client doesn't create it automatically when needed (eg. b56ea9dd308c31555aa1433514fa3481adb92f31)
    groups: {
      data: []
    }
  }

  const contactWithFormValues = {
    ...oldContactCleaned,
    gender: gender || '',
    name: {
      ...oldContactCleaned?.name,
      givenName: givenName || '',
      additionalName: additionalName,
      surname: surname,
      familyName: familyName || ''
    },
    email: email
      ? email
          .filter(val => val && val.email)
          .map(({ email, emailLabel }, index) => ({
            address: email,
            ...makeTypeAndLabel(emailLabel),
            primary: index === 0
          }))
      : [],
    address: createAddress({ address, oldContact: oldContactCleaned, t }),
    phone: phone
      ? phone
          .filter(val => val && val.phone)
          .map(({ phone, phoneLabel }, index) => ({
            number: phone,
            ...makeTypeAndLabel(phoneLabel),
            primary: index === 0
          }))
      : [],
    cozy: cozy
      ? [
          {
            url: cozy,
            ...makeTypeAndLabel(formValues['cozyLabel']),
            primary: true
          }
        ]
      : [],
    company: company || '',
    jobTitle: jobTitle || '',
    birthday: birthday || '',
    birthplace: birthplace || '',
    note: note || '',
    relationships: relationshipsFormValues,
    metadata: {
      ...oldContactCleaned?.metadata,
      version: 1,
      cozy: true
    }
  }

  return updateIndexFullNameAndDisplayName(contactWithFormValues)
}

export default formValuesToContact
