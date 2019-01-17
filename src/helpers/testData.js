export const johnDoeContact = {
  id: '9ecfbf4b-20e7-4bac-87f1-eea53350857d',
  _id: '9ecfbf4b-20e7-4bac-87f1-eea53350857d',
  _type: 'io.cozy.contacts',
  _rev: '1-19c313536e8b27473aa26bf105b03269',
  address: [
    {
      formattedAddress: '94 Hinton Road 05034 Fresno, Singapore',
      type: 'Home',
      primary: true
    },
    {
      street: '426 Runolfsson Knolls',
      city: 'Port Easter',
      country: 'Cocos (Keeling) Islands',
      postcode: '84573',
      type: 'Work'
    }
  ],
  email: [
    {
      address: 'john.doe@posteo.net',
      type: 'personal',
      primary: false
    },
    {
      address: 'john.doe@cozycloud.cc',
      primary: true
    }
  ],
  birthday: '1999-5-1',
  company: 'Cozy cloud',
  cozy: [
    {
      label: 'MyCozy',
      primary: true,
      url: 'https://johndoe.mycozy.cloud'
    }
  ],
  fullname: 'John Doe',
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  metadata: {
    cozy: true,
    version: 1
  },
  note:
    'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
  phone: [
    {
      number: '+33 (2)0 90 00 54 04',
      primary: true
    },
    {
      number: '+33 6 77 11 22 33',
      primary: false
    }
  ]
}

export const johnDoeFormValues = {
  birthday: '1999-5-1',
  cozy: 'https://johndoe.mycozy.cloud',
  cozyLabel: 'MyCozy',
  address: [
    {
      address: '94 Hinton Road 05034 Fresno, Singapore',
      addressLabel: 'Home'
    },
    {
      address:
        '426 Runolfsson Knolls 84573 Port Easter Cocos (Keeling) Islands',
      addressLabel: 'Work'
    }
  ],
  email: [
    {
      email: 'john.doe@cozycloud.cc',
      emailLabel: undefined
    },
    {
      email: 'john.doe@posteo.net',
      emailLabel: 'personal'
    }
  ],
  phone: [
    {
      phone: '+33 (2)0 90 00 54 04',
      phoneLabel: undefined
    },
    {
      phone: '+33 6 77 11 22 33',
      phoneLabel: undefined
    }
  ],
  givenName: 'John',
  familyName: 'Doe',
  company: 'Cozy cloud',
  note:
    'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.'
}
