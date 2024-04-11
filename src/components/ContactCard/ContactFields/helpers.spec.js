import { makeTLabel } from './helpers'

const t = x => x
const polyglot = { has: jest.fn() }

describe('makeTLabel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('for phone', () => {
    it('should return correct label with prefix', () => {
      polyglot.has.mockReturnValue(true)

      const res = makeTLabel({
        type: 'phone',
        value: { label: 'home', type: 'cell' },
        t,
        polyglot
      })

      expect(res).toBe('label.phone.cell-home')
    })

    it('should return correct label with prefix', () => {
      polyglot.has.mockReturnValue(false)

      const res = makeTLabel({
        type: 'phone',
        value: { type: 'custom', label: 'home' },
        t,
        polyglot
      })

      expect(res).toBe('custom (label.home)')
    })

    it('should return type if no label', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: undefined, type: 'cell' },
        t,
        polyglot
      })

      expect(res).toBe('cell')
    })

    it('should return only the label if no type', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: 'home', type: undefined },
        t,
        polyglot
      })

      expect(res).toBe('label.home')
    })

    it('should return null if no type and label', () => {
      const res = makeTLabel({
        type: 'phone',
        value: { label: undefined, type: undefined },
        t,
        polyglot
      })

      expect(res).toBe(null)
    })
  })

  describe('for address', () => {
    it('should return correct label with prefix', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: 'home', type: 'custom' },
        t,
        polyglot
      })

      expect(res).toBe('custom (label.home)')
    })

    it('should return the type if no label', () => {
      const res = makeTLabel({
        type: 'address',
        value: { type: 'custom', label: undefined },
        t,
        polyglot
      })

      expect(res).toBe('custom')
    })

    it('should return correct label with previx even with no type', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: 'home', type: undefined },
        t,
        polyglot
      })

      expect(res).toBe('label.address.home')
    })

    it('should return null if no type/label', () => {
      const res = makeTLabel({
        type: 'address',
        value: { label: undefined, type: undefined },
        t,
        polyglot
      })

      expect(res).toBe(null)
    })
  })

  describe('for email and cozy url', () => {
    it('should return correct type and label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: 'home', type: 'custom' },
        t,
        polyglot
      })

      expect(res).toBe('custom (label.home)')
    })

    it('should return type if no label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: undefined, type: 'custom' },
        t,
        polyglot
      })

      expect(res).toBe('custom')
    })

    it('should return label even if no type', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: 'home', type: undefined },
        t,
        polyglot
      })

      expect(res).toBe('label.home')
    })

    it('should return null if no type/label', () => {
      const res = makeTLabel({
        type: 'email',
        value: { label: undefined, type: undefined },
        t,
        polyglot
      })

      expect(res).toBe(null)
    })
  })
})
