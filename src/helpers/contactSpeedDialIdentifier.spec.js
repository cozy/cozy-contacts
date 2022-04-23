import {
  getContactSpeedDialIdentifier,
  getSortedIdentifiers
} from './contactSpeedDialIdentifier'

afterAll(() => {
  jest.restoreAllMocks()
})

describe('contact speed dial identifier', () => {
  it('should return correct identifier for email', () => {
    const contact = {
      displayName: 'toto@toto.fr'
    }

    expect(getContactSpeedDialIdentifier(contact)).toEqual('t')
  })

  it('should return correct identifier for uppercase name', () => {
    const contact = {
      displayName: 'John Doe'
    }

    expect(getContactSpeedDialIdentifier(contact)).toEqual('j')
  })

  it('should return correct identifier for non-ascii characters', () => {
    const contact = {
      displayName: 'Σωκράτης Παπασταθόπουλος'
    }

    expect(getContactSpeedDialIdentifier(contact)).toEqual('σ')
  })

  it('should handle missing display name', () => {
    const contact = {}

    expect(getContactSpeedDialIdentifier(contact)).toBeUndefined()
  })

  it('should handle missing contact', () => {
    expect(getContactSpeedDialIdentifier(null)).toBeUndefined()
  })

  it('should handle empty display name', () => {
    const contact = {
      displayName: ''
    }

    expect(getContactSpeedDialIdentifier(contact)).toBeUndefined()
  })
})

describe('contact speed dial identifiers sorting and filtering', () => {
  it('should return the sorted list of identifiers', () => {
    const contacts = [
      {
        displayName: 'toto@toto.fr'
      },
      {
        displayName: 'Σωκράτης Παπασταθόπουλος'
      },
      {
        displayName: ''
      },
      {
        displayName: 'John Deere'
      },
      {
        displayName: 'jane Deere'
      },
      {
        displayName: 'Albator'
      },
      {
        displayName: null
      },
      {
        displayName: 'Mireille Mathieu'
      },
      {
        displayName: 'ピカチュウ'
      },
      {
        displayName: 'Alex'
      }
    ]

    expect(getSortedIdentifiers(contacts)).toEqual([
      'a',
      'j',
      'm',
      't',
      'σ',
      'ピ'
    ])
  })
})
