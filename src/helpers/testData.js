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
      pobox: '2',
      street: '426 Runolfsson Knolls',
      city: 'Port Easter',
      region: undefined,
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
  birthplace: 'somewhere',
  gender: 'male',
  company: 'Cozy cloud',
  jobTitle: 'Dreamer',
  cozy: [
    {
      type: 'MyCozy',
      primary: true,
      url: 'https://johndoe.mycozy.cloud'
    }
  ],
  fullname: 'John Doe',
  name: {
    givenName: 'John',
    familyName: 'Doe',
    additionalName: 'J.'
  },
  metadata: {
    cozy: true,
    version: 1
  },
  note: 'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
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
  birthplace: 'somewhere',
  gender: 'male',
  cozy: 'https://johndoe.mycozy.cloud',
  cozyLabel: '{"type":"MyCozy"}',
  address: [
    {
      fieldId: 'fieldId_1',
      address: '94 Hinton Road 05034 Fresno, Singapore',
      addressLabel: '{"type":"Home"}',
      addressapartment: undefined,
      addressbuilding: undefined,
      addresscity: undefined,
      addresscode: undefined,
      addressregion: undefined,
      addresscountry: undefined,
      addressentrycode: undefined,
      addressfloor: undefined,
      addresslocality: undefined,
      addressnumber: undefined,
      addressstairs: undefined,
      addressstreet: '94 Hinton Road 05034 Fresno, Singapore'
    },
    {
      fieldId: 'fieldId_2',
      address:
        '426 Runolfsson Knolls 84573 Port Easter Cocos (Keeling) Islands',
      addressLabel: '{"type":"Work"}',
      addressapartment: undefined,
      addressbuilding: undefined,
      addresscity: 'Port Easter',
      addressregion: undefined,
      addresscode: '84573',
      addresscountry: 'Cocos (Keeling) Islands',
      addressentrycode: undefined,
      addressfloor: undefined,
      addresslocality: undefined,
      addressnumber: undefined,
      addressstairs: undefined,
      addressstreet: '426 Runolfsson Knolls'
    }
  ],
  email: [
    {
      fieldId: 'fieldId_3',
      email: 'john.doe@cozycloud.cc',
      emailLabel: undefined
    },
    {
      fieldId: 'fieldId_4',
      email: 'john.doe@posteo.net',
      emailLabel: '{"type":"personal"}'
    }
  ],
  phone: [
    {
      fieldId: 'fieldId_5',
      phone: '+33 (2)0 90 00 54 04',
      phoneLabel: undefined
    },
    {
      fieldId: 'fieldId_6',
      phone: '+33 6 77 11 22 33',
      phoneLabel: undefined
    }
  ],
  givenName: 'John',
  additionalName: 'J.',
  familyName: 'Doe',
  company: 'Cozy cloud',
  jobTitle: 'Dreamer',
  note: 'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
  relatedContact: [
    {
      relatedContactId: 'relatedContactID',
      relatedContactLabel: '{"type":"related"}'
    }
  ]
}

export const johnDoeContactWithRelated = {
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
      pobox: '2',
      street: '426 Runolfsson Knolls',
      city: 'Port Easter',
      region: undefined,
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
  birthplace: 'somewhere',
  gender: 'male',
  company: 'Cozy cloud',
  jobTitle: 'Dreamer',
  cozy: [
    {
      type: 'MyCozy',
      primary: true,
      url: 'https://johndoe.mycozy.cloud'
    }
  ],
  fullname: 'John Doe',
  name: {
    givenName: 'John',
    familyName: 'Doe',
    additionalName: 'J.'
  },
  metadata: {
    cozy: true,
    version: 1
  },
  note: 'Atque cupiditate saepe omnis quos ut molestiae labore voluptates omnis.',
  phone: [
    {
      number: '+33 (2)0 90 00 54 04',
      primary: true
    },
    {
      number: '+33 6 77 11 22 33',
      primary: false
    }
  ],

  relationships: {
    accounts: { data: [] },
    groups: { data: [] },
    related: {
      data: [
        {
          metadata: { relationTypes: ['spouse'] },
          _id: '5b49553c5916cf7b5b2a5f48600078a8',
          _type: 'io.cozy.contacts'
        }
      ]
    }
  },
  related: {
    target: {
      id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _type: 'io.cozy.contacts',
      _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
      company: '',
      fullname: 'John Doe',
      me: true,
      note: ''
    },
    name: 'related',
    doctype: 'io.cozy.contacts',
    data: [
      {
        displayName: 'Alice Doe',
        _id: '5b49553c5916cf7b5b2a5f48600078a8',
        _type: 'io.cozy.contacts'
      }
    ]
  }
}

export const contactWithGroup = {
  id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _type: 'io.cozy.contacts',
  _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
  address: [],
  company: '',
  jobTitle: '',
  cozy: [{ primary: true, url: 'https://q.mycozy.cloud' }],
  cozyMetadata: {
    createdAt: '2019-05-21T12:24:01.084Z',
    createdByApp: 'Contacts',
    createdByAppVersion: '0.8.3',
    doctypeVersion: 2,
    metadataVersion: 1,
    updatedAt: '2019-07-15T11:22:13.621Z',
    updatedByApps: [
      { date: '2019-07-15T11:22:13.621Z', slug: 'Contacts', version: '0.8.5' }
    ]
  },
  email: [{ address: 'quentin@cozycloud.cc', primary: true }],
  fullname: 'quentin valmori',
  me: true,
  metadata: { cozy: true, version: 1 },
  name: { familyName: 'valmori', givenName: 'quentin' },
  note: '',
  phone: [{ number: '+33600041300', primary: true }],
  relationships: {
    accounts: { data: [] },
    groups: {
      data: [
        {
          _id: '5b49553c5916cf7b5b2a5f48600078a8',
          _type: 'io.cozy.contacts.groups'
        }
      ]
    }
  },
  groups: {
    target: {
      id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _type: 'io.cozy.contacts',
      _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
      company: '',
      fullname: 'quentin valmori',
      me: true,
      note: ''
    },
    name: 'groups',
    doctype: 'io.cozy.contacts.groups',
    data: [
      {
        _id: '5b49553c5916cf7b5b2a5f48600078a8',
        _type: 'io.cozy.contacts.groups'
      }
    ]
  },
  accounts: { name: 'accounts', doctype: 'io.cozy.contacts.accounts', data: [] }
}

export const groups = [
  {
    id: '5b49553c5916cf7b5b2a5f48600078a8',
    _id: '5b49553c5916cf7b5b2a5f48600078a8',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-7862def64fb044932d3264e2f8477454',
    cozyMetadata: {
      createdAt: '2019-07-15T11:22:13.551Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.5',
      metadataVersion: 1,
      updatedAt: '2019-07-15T11:22:13.551Z',
      updatedByApps: [
        { date: '2019-07-15T11:22:13.551Z', slug: 'Contacts', version: '0.8.5' }
      ]
    },
    metadata: { version: 1 },
    name: '2018-2019 Enseignants'
  },
  {
    id: '8cb7ea7fe264260e997529439b0091c0',
    _id: '8cb7ea7fe264260e997529439b0091c0',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-8b92242f1ccaca20e7862306cddbe37f',
    cozyMetadata: {
      createdAt: '2020-04-15T06:46:20.128Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.7',
      metadataVersion: 1,
      updatedAt: '2020-04-15T06:46:20.128Z',
      updatedByApps: [
        { date: '2020-04-15T06:46:20.128Z', slug: 'Contacts', version: '0.8.7' }
      ]
    },
    metadata: { version: 1 },
    name: 'ez'
  },
  {
    id: '18c031b0ac9f47cdc48b275b1900726d',
    _id: '18c031b0ac9f47cdc48b275b1900726d',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-f438477a749fa0b90cde2e7c53a41bd6',
    cozyMetadata: {
      createdAt: '2019-11-08T07:45:55.424Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.6',
      metadataVersion: 1,
      updatedAt: '2019-11-08T07:45:55.424Z',
      updatedByApps: [
        { date: '2019-11-08T07:45:55.424Z', slug: 'Contacts', version: '0.8.6' }
      ]
    },
    metadata: { version: 1 },
    name: 'groupe test'
  }
]
