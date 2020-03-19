import { sortLastNameFirst, sortContactsBy } from './'
describe('Sort contacts', () => {
  describe('By Last Name', () => {
    test('should sort contact by last name', () => {
      const contacts = [
        { name: { givenName: '', familyName: '' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { givenName: 'A', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'C' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: '', familyName: 'A' } }
      ]
      const sortedContact = [...contacts].sort(sortLastNameFirst)
      expect(sortedContact).toEqual([
        { name: { givenName: '', familyName: '' } },
        { name: { givenName: '', familyName: 'A' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'A', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'B', familyName: 'C' } }
      ])
    })
    test('should work with incomplete data', () => {
      const contacts = [
        { name: { givenName: '' } },
        { name: { givenName: 'A' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { familyName: 'B' } },
        { name: { familyName: 'C' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { givenName: 'B', familyName: 'C' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: '', familyName: 'A' } }
      ]
      const sortedContact = [...contacts].sort(sortLastNameFirst)
      expect(sortedContact).toEqual([
        { name: { givenName: '' } },
        { name: { givenName: '', familyName: 'A' } },
        { name: { givenName: 'A' } },
        { name: { givenName: 'A', familyName: '' } },
        { name: { givenName: 'A', familyName: 'A' } },
        { name: { givenName: 'B', familyName: 'A' } },
        { name: { familyName: 'B' } },
        { name: { givenName: '', familyName: 'B' } },
        { name: { givenName: 'B', familyName: '' } },
        { name: { givenName: 'B', familyName: 'B' } },
        { name: { givenName: 'C', familyName: 'B' } },
        { name: { familyName: 'C' } },
        { name: { givenName: 'A', familyName: 'C' } },
        { name: { givenName: 'B', familyName: 'C' } }
      ])
    })
  })

  describe('By filter group', () => {
    const groupFamilyId = 'group_id_family'
    const groupWorkId = 'group_id_work'
    const inGroupFamily = { groups: { data: [{ _id: groupFamilyId }] } }
    const inGroupWork = { groups: { data: [{ _id: groupWorkId }] } }
    const inGroupFamilyWork = {
      groups: { data: [{ _id: groupFamilyId }, { _id: groupWorkId }] }
    }
    const contacts = [
      { name: { givenName: 'A' }, relationships: inGroupFamily },
      { name: { givenName: 'B' }, relationships: inGroupWork },
      { name: { givenName: 'C' }, relationships: {} },
      { name: { givenName: 'D' }, relationships: inGroupFamilyWork },
      { name: { givenName: 'E' }, relationships: inGroupFamily },
      { name: { givenName: 'F' }, relationships: inGroupFamily },
      { name: { givenName: 'G' }, relationships: inGroupWork },
      { name: { givenName: 'H' }, relationships: {} },
      { name: { givenName: 'I' }, relationships: inGroupFamily }
    ]

    test('should get only contacts in group "work"', () => {
      const sortedContact = sortContactsBy(contacts, groupWorkId)
      expect(sortedContact).toEqual([
        { name: { givenName: 'B' }, relationships: inGroupWork },
        { name: { givenName: 'D' }, relationships: inGroupFamilyWork },
        { name: { givenName: 'G' }, relationships: inGroupWork }
      ])
    })

    test('should get only contacts in group "family"', () => {
      const sortedContact = sortContactsBy(contacts, groupFamilyId)
      expect(sortedContact).toEqual([
        { name: { givenName: 'A' }, relationships: inGroupFamily },
        { name: { givenName: 'D' }, relationships: inGroupFamilyWork },
        { name: { givenName: 'E' }, relationships: inGroupFamily },
        { name: { givenName: 'F' }, relationships: inGroupFamily },
        { name: { givenName: 'I' }, relationships: inGroupFamily }
      ])
    })
  })
})
