import ach from 'cozy-ach'

import {
  fixCozy,
  fixEmail,
  shouldDeleteContact,
  getDoctypes,
  run
} from './20190429_migrateContacts'

jest.mock('cozy-ach', () => ({
  mkAPI: jest.fn(),
  utils: {
    getWithInstanceLogger: jest.fn()
  }
}))

const goodContact = {
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  cozy: [
    {
      url: 'https://johndoe.mycozy.cloud',
      primary: true
    }
  ],
  email: [
    {
      address: 'john.doe@gmail.com',
      primary: true
    }
  ]
}

const emptyCozyContact = {
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  cozy: ''
}

const strCozyContact = {
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  cozy: 'https://johndoe.mycozy.cloud'
}

const strEmailContact = {
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  email: 'john.doe@gmail.com'
}

const ghostContact = {
  name: {
    givenName: 'John',
    familyName: 'Doe'
  },
  trashed: true,
  relationships: {
    accounts: {
      data: [
        {
          _id: '94e59f31-5956',
          _type: 'io.cozy.contacts.accounts'
        }
      ]
    }
  }
}

const contactAccounts = [
  {
    // deleted account
    _id: '94e59f31-5956',
    _type: 'io.cozy.contacts.accounts',
    sourceAccount: null
  },
  {
    // active account
    _id: '8bd4df5c-a908',
    _type: 'io.cozy.contacts.accounts',
    sourceAccount: 'c9a7c7ad-5ae7'
  }
]

describe('fixCozy function', () => {
  it('should fix cozy attribute if it is an empty string', () => {
    const result = fixCozy(emptyCozyContact)
    const expectedContact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      cozy: []
    }
    const expected = {
      contact: expectedContact,
      cozyFixed: false,
      emptyCozyFixed: true
    }
    expect(result).toEqual(expected)
  })

  it('should fix cozy attribute if it is a string', () => {
    const result = fixCozy(strCozyContact)
    const expectedContact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      cozy: [
        {
          url: 'https://johndoe.mycozy.cloud',
          primary: true
        }
      ]
    }
    const expected = {
      contact: expectedContact,
      cozyFixed: true,
      emptyCozyFixed: false
    }
    expect(result).toEqual(expected)
  })

  it('should do nothing if cozy is an array', () => {
    const result = fixCozy(goodContact)
    const expected = {
      contact: goodContact,
      cozyFixed: false,
      emptyCozyFixed: false
    }
    expect(result).toEqual(expected)
  })
})

describe('fixEmail function', () => {
  it('should fix email attribute if it is a string', () => {
    const result = fixEmail(strEmailContact)
    const expectedContact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      email: [
        {
          address: 'john.doe@gmail.com',
          primary: true
        }
      ]
    }
    const expected = {
      contact: expectedContact,
      emailFixed: true
    }
    expect(result).toEqual(expected)
  })

  it('should do nothing if email is an array', () => {
    const result = fixEmail(goodContact)
    const expected = {
      contact: goodContact,
      emailFixed: false
    }
    expect(result).toEqual(expected)
  })
})

describe('shouldDeleteContact function', () => {
  it('should delete ghosts', () => {
    const shouldDelete = shouldDeleteContact(ghostContact, contactAccounts)
    expect(shouldDelete).toBeTruthy()
  })

  it('should do nothing if contact has no trashed attribute', () => {
    const contact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      }
    }
    const shouldDelete = shouldDeleteContact(contact, contactAccounts)
    expect(shouldDelete).toBeFalsy()
  })

  it('should do nothing if contact is not trashed', () => {
    const contact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      trashed: false
    }
    const shouldDelete = shouldDeleteContact(contact, contactAccounts)
    expect(shouldDelete).toBeFalsy()
  })

  it('should do nothing if contact is linked to an active account', () => {
    const contact = {
      name: {
        givenName: 'John',
        familyName: 'Doe'
      },
      trashed: true,
      relationships: {
        accounts: {
          data: [
            {
              _id: '8bd4df5c-a908',
              _type: 'io.cozy.contacts.accounts'
            }
          ]
        }
      }
    }
    const shouldDelete = shouldDeleteContact(contact, contactAccounts)
    expect(shouldDelete).toBeFalsy()
  })
})

describe('getDoctypes', () => {
  it('should return the doctypes that we may change', () => {
    const result = getDoctypes()
    expect(result).toEqual(['io.cozy.contacts', 'io.cozy.contacts.accounts'])
  })
})

describe('run', () => {
  const fakeAPI = {
    fetchAll: jest.fn(),
    update: jest.fn(),
    updateAll: jest.fn(),
    deleteAll: jest.fn()
  }
  const logWithInstanceSpy = jest.fn()

  beforeEach(() => {
    ach.mkAPI.mockReturnValue(fakeAPI)
    ach.utils.getWithInstanceLogger.mockReturnValue(logWithInstanceSpy)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should do the migrations', async () => {
    const contacts = [
      emptyCozyContact,
      strCozyContact,
      strEmailContact,
      ghostContact,
      goodContact
    ]
    fakeAPI.fetchAll.mockResolvedValueOnce(contacts)
    fakeAPI.fetchAll.mockResolvedValueOnce(contactAccounts)

    await run(ach, false)
    expect(fakeAPI.deleteAll).toHaveBeenCalledWith('io.cozy.contacts', [
      ghostContact
    ])

    const expectedUpdates = [
      {
        name: {
          givenName: 'John',
          familyName: 'Doe'
        },
        cozy: []
      },
      {
        name: {
          givenName: 'John',
          familyName: 'Doe'
        },
        cozy: [
          {
            url: 'https://johndoe.mycozy.cloud',
            primary: true
          }
        ]
      },
      {
        name: {
          givenName: 'John',
          familyName: 'Doe'
        },
        email: [
          {
            address: 'john.doe@gmail.com',
            primary: true
          }
        ]
      }
    ]
    expect(fakeAPI.updateAll).toHaveBeenCalledWith(
      'io.cozy.contacts',
      expectedUpdates
    )
    expect(logWithInstanceSpy).toHaveBeenCalledWith(
      'Processed 5 contacts: \n[cozy]: 1 fixed.\n[empty cozy]: 1 fixed.\n[email]: 1 fixed.\n[ghosts]: 1 deleted.'
    )
  })

  it('should not call the API in dryRun mode', async () => {
    const contacts = [
      emptyCozyContact,
      strCozyContact,
      strEmailContact,
      ghostContact,
      goodContact
    ]
    fakeAPI.fetchAll.mockResolvedValueOnce(contacts)
    fakeAPI.fetchAll.mockResolvedValueOnce(contactAccounts)

    await run(ach, true)
    expect(fakeAPI.deleteAll).not.toHaveBeenCalled()
    expect(fakeAPI.updateAll).not.toHaveBeenCalled()
    expect(logWithInstanceSpy).toHaveBeenCalledWith(
      'Would process 5 contacts: \n[cozy]: 1 would be fixed.\n[empty cozy]: 1 would be fixed.\n[email]: 1 would be fixed.\n[ghosts]: 1 would be deleted.'
    )
  })

  it('should display a log if there is no contacts', async () => {
    fakeAPI.fetchAll.mockResolvedValueOnce([])
    fakeAPI.fetchAll.mockResolvedValueOnce(contactAccounts)

    await run(ach, true)
    expect(fakeAPI.deleteAll).not.toHaveBeenCalled()
    expect(fakeAPI.updateAll).not.toHaveBeenCalled()
    expect(logWithInstanceSpy).toHaveBeenCalledWith(
      'No contacts, nothing to migrate'
    )
  })
})
