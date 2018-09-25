import { mergeContact } from './mergeContact'

describe('Merge contacts', () => {
  test('should merge properties', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost' }],
      name: { familyName: 'Starck' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const importedContact = {
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [{ number: '0123456789' }],
      email: [{ address: 'ned@localhost' }]
    }
    const expectedContact = {
      email: [{ address: 'starck@localhost' }, { address: 'ned@localhost' }],
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
      name: { familyName: 'Starck', givenName: 'Ned' }
    }
    expect(mergeContact(fakeContact, importedContact)).toEqual(expectedContact)
  })

  test('should merge name only if it is longer', () => {
    const fakeContact = {
      email: [{ address: 'starck@localhost' }],
      name: { familyName: 'Starck', givenName: 'N' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const importedContact = {
      name: { familyName: 'S.', givenName: 'Ned' },
      email: [{ address: 'ned@localhost' }]
    }
    const expectedContact = {
      email: [{ address: 'starck@localhost' }, { address: 'ned@localhost' }],
      name: { familyName: 'Starck', givenName: 'Ned' },
      phone: [{ number: '0987654321', primary: true, type: 'Work' }],
      address: [{ formattedAddress: 'Westeros', primary: true, type: 'Work' }]
    }
    const mergedContact = mergeContact(fakeContact, importedContact)
    expect(mergedContact).toEqual(expectedContact)
  })
})
