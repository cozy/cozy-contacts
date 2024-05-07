import { moveToHead, makeItemLabel } from './contactToFormValues'
import { makeTypeAndLabel } from './helpers'

describe('moveToHead function', () => {
  it('should move an item to head of the array', () => {
    const items = [1, 5, 657, 42, 3, 27, 88, 3, 4]
    const shouldBeHead = v => v === 42
    const expected = [42, 1, 5, 657, 3, 27, 88, 3, 4]
    const actual = moveToHead(shouldBeHead)(items)
    expect(actual).toEqual(expected)
  })
})

describe('makeItemLabel', () => {
  it('should return undefined if no arg', () => {
    const res = makeItemLabel()

    expect(res).toBe(undefined)
  })

  it('should return undefined if nothing defined', () => {
    const res = makeItemLabel({ type: undefined, label: undefined })

    expect(res).toBe(undefined)
  })

  it('should return correct type and label', () => {
    const res = makeItemLabel({ type: 'cell', label: 'work' })

    expect(res).toBe('{"type":"cell","label":"work"}')
  })

  it('should return only label if no type', () => {
    const res = makeItemLabel({ type: undefined, label: 'work' })

    expect(res).toBe('{"label":"work"}')
  })

  it('should return only type if no label', () => {
    const res = makeItemLabel({ type: 'cell', label: undefined })

    expect(res).toBe('{"type":"cell"}')
  })
})

describe('makeTypeAndLabel', () => {
  it('should return undefined if no arg', () => {
    const res = makeTypeAndLabel()

    expect(res).toStrictEqual({ type: undefined, label: undefined })
  })

  it('should return correct type and label', () => {
    const res = makeTypeAndLabel('{"type":"cell","label":"work"}')

    expect(res).toStrictEqual({ type: 'cell', label: 'work' })
  })

  it('should return only label', () => {
    const res = makeTypeAndLabel('{"label":"work"}')

    expect(res).toStrictEqual({ type: undefined, label: 'work' })
  })

  it('should return only type', () => {
    const res = makeTypeAndLabel('{"type":"cell"}')

    expect(res).toStrictEqual({ type: 'cell', label: undefined })
  })
})
