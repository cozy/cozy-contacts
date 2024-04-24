import {
  updateAttributeWithLabel,
  updateContactAttributes,
  updateContacts
} from './autoDefineLabelsService'

describe('updateAttributeWithLabel', () => {
  describe('for one value', () => {
    it('should not add the label if no type', () => {
      const res = updateAttributeWithLabel(
        { address: [{ primary: true }] },
        'address'
      )

      expect(res).toStrictEqual([{ primary: true }])
    })

    it('should add `home` label', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'custom' }] },
        'address'
      )

      expect(res).toStrictEqual([{ type: 'custom', label: 'home' }])
    })

    it('should add `work` label', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'office' }] },
        'address'
      )

      expect(res).toStrictEqual([{ type: 'office', label: 'work' }])
    })

    it('should add `work` label even with uppercase', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'jOb' }] },
        'address'
      )

      expect(res).toStrictEqual([{ type: 'jOb', label: 'work' }])
    })

    it('should add `work` label even with accent', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'prôfessional' }] },
        'address'
      )

      expect(res).toStrictEqual([{ type: 'prôfessional', label: 'work' }])
    })

    it('should add `work` label even with accent uppercase', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'prÔfessional' }] },
        'address'
      )

      expect(res).toStrictEqual([{ type: 'prÔfessional', label: 'work' }])
    })
  })

  describe('for two values', () => {
    it('should add `home` and `work` label', () => {
      const res = updateAttributeWithLabel(
        { address: [{ type: 'custom' }, { type: 'pro' }] },
        'address'
      )

      expect(res).toStrictEqual([
        { type: 'custom', label: 'home' },
        { type: 'pro', label: 'work' }
      ])
    })
  })
})

describe('updateContactAttributes', () => {
  it('should return contact with updated address', () => {
    const res = updateContactAttributes({
      _id: 'contact',
      address: [{ type: 'custom' }]
    })

    expect(res).toStrictEqual({
      _id: 'contact',
      address: [{ type: 'custom', label: 'home' }]
    })
  })

  it('should return contact with updated address and phone', () => {
    const res = updateContactAttributes({
      _id: 'contact',
      address: [{ type: 'custom' }],
      phone: [{ type: 'pro' }]
    })

    expect(res).toStrictEqual({
      _id: 'contact',
      address: [{ type: 'custom', label: 'home' }],
      phone: [{ type: 'pro', label: 'work' }]
    })
  })
})

describe('updateContacts', () => {
  it('should return updated contacts', () => {
    const res = updateContacts([
      { _id: 'contact1', address: [{ type: 'custom' }] },
      { _id: 'contact2', phone: [{ type: 'pro' }] },
      {
        _id: 'contact3',
        address: [{ type: 'custom' }],
        phone: [{ type: 'pro' }]
      }
    ])

    expect(res).toStrictEqual([
      { _id: 'contact1', address: [{ type: 'custom', label: 'home' }] },
      { _id: 'contact2', phone: [{ type: 'pro', label: 'work' }] },
      {
        _id: 'contact3',
        address: [{ type: 'custom', label: 'home' }],
        phone: [{ type: 'pro', label: 'work' }]
      }
    ])
  })
})
