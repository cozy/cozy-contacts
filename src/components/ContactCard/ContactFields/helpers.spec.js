import { makeTLabel } from './helpers'

const t = x => x

describe('makeTLabel', () => {
  describe('for phone', () => {
    it('should return correct label with prefix', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: 'home', type: 'cell' },
        t
      })

      expect(res).toBe('label.phone.cell-home')
    })

    it('should return null if no label', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: undefined, type: 'cell' },
        t
      })

      expect(res).toBe(null)
    })

    it('should return null if no type', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: 'home', type: undefined },
        t
      })

      expect(res).toBe(null)
    })

    it('should return null if no type and label', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: undefined, type: undefined },
        t
      })

      expect(res).toBe(null)
    })
  })

  describe('for address', () => {
    it('should return correct label with prefix', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: 'home', type: 'custom' },
        t
      })

      expect(res).toBe('label.address.home')
    })

    it('should return null if no label', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: undefined, type: 'custom' },
        t
      })

      expect(res).toBe(null)
    })

    it('should return correct label with previx even with no type', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: 'home', type: undefined },
        t
      })

      expect(res).toBe('label.address.home')
    })

    it('should return null if no type/label', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: undefined, type: undefined },
        t
      })

      expect(res).toBe(null)
    })
  })

  describe('for email and cozy url', () => {
    it('should return correct label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: 'home', type: 'custom' },
        t
      })

      expect(res).toBe('label.home')
    })

    it('should return null if no label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: undefined, type: 'custom' },
        t
      })

      expect(res).toBe(null)
    })

    it('should return correct label even if no type', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: 'home', type: undefined },
        t
      })

      expect(res).toBe('label.home')
    })

    it('should return null if no type/label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: undefined, type: undefined },
        t
      })

      expect(res).toBe(null)
    })
  })
})
