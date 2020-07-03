export const fakedContact = {
  id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _type: 'io.cozy.contacts',
  _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
  address: [],
  company: '',
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
