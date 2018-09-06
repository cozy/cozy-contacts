import { mergeContact } from './allContacts'

describe('Merge contacts', () => {
  test('should merge properties', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost' }],
      fullname: 'Starck',
      name: { familyName: 'Starck' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const importedContact = {
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [{ number: '0123456789' }],
      email: [{ address: 'ned@localhost' }]
    }
    const expectedContact = {
      email: [{ address: 'starck@localhost' }, { address: 'ned@localhost' }],
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [
        { number: '0987654321', primary: true, type: 'Work' },
        { number: '0123456789' }
      ],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    expect(mergeContact(fakeContact, importedContact)).toEqual(expectedContact)
  })

  test('should remove duplicates in array properties', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost', primary: true }],
      phone: [{ number: '0123456789', primary: true }],
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' }
    }
    const importedContact = {
      email: [{ address: 'starck@localhost' }, { address: 'ned@localhost' }],
      phone: [
        { number: '0123456789', type: 'Work' },
        { number: '0987654321', type: 'Home' }
      ]
    }
    const expectedContact = {
      email: [
        { address: 'starck@localhost', primary: true },
        { address: 'ned@localhost' }
      ],
      phone: [
        { number: '0123456789', type: 'Work', primary: true },
        { number: '0987654321', type: 'Home' }
      ],
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' }
    }
    expect(mergeContact(fakeContact, importedContact)).toEqual(expectedContact)
  })

  test('should merge name only if it is longer', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost' }],
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const importedContact = {
      fullname: 'Starck',
      name: { familyName: 'Starck' },
      email: [{ address: 'ned@localhost' }]
    }
    const expectedContact = {
      email: [{ address: 'starck@localhost' }, { address: 'ned@localhost' }],
      fullname: 'Ned Starck',
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const mergedContact = mergeContact(fakeContact, importedContact)
    expect(mergedContact).toEqual(expectedContact)
  })

  test('should merge if no fullname', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost' }]
    }

    const importedContact = {
      email: [{ address: 'starck@localhost' }],
      fullname: 'Ned Starck'
    }

    const expectedContact = {
      email: [{ address: 'starck@localhost' }],
      fullname: 'Ned Starck'
    }

    const mergedContact = mergeContact(fakeContact, importedContact)
    expect(mergedContact).toEqual(expectedContact)
  })
})
