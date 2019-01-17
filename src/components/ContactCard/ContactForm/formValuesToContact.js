const formValuesToContact = data => {
  const {
    givenName,
    familyName,
    phone,
    email,
    address,
    cozy,
    company,
    birthday,
    note
  } = data

  const fullName = (givenName || '') + ' ' + (familyName || '')

  return {
    fullname: fullName.trim(),
    name: {
      givenName,
      familyName
    },
    email: email.filter(val => val).map(({ email, emailLabel }, index) => ({
      address: email,
      type: emailLabel,
      primary: index === 0
    })),
    address: address
      .filter(val => val)
      .map(({ address, addressLabel }, index) => ({
        formattedAddress: address,
        type: addressLabel,
        primary: index === 0
      })),
    phone: phone.filter(val => val).map(({ phone, phoneLabel }, index) => ({
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
      : undefined,
    company,
    birthday,
    note,
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
}

export default formValuesToContact
