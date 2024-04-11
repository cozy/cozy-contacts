import { makeInitialCustomValue } from './helpers'

describe('makeInitialCustomValue', () => {
  it('should return undefined if no name', () => {
    const res = makeInitialCustomValue(
      undefined,
      '{"type":"fax","label":"work"}'
    )

    expect(res).toStrictEqual(undefined)
  })

  it('should return undefined if no value', () => {
    const res = makeInitialCustomValue('phone[0].phoneLabel', undefined)

    expect(res).toStrictEqual(undefined)
  })

  it('should return undefined if no name/value', () => {
    const res = makeInitialCustomValue(undefined, undefined)

    expect(res).toStrictEqual(undefined)
  })

  it('should return undefined for gender input', () => {
    const res = makeInitialCustomValue(
      'gender',
      '{"type":"fax","label":"work"}'
    )

    expect(res).toStrictEqual(undefined)
  })

  it('should return the type if no label to ensure backwards compatibility', () => {
    const res = makeInitialCustomValue('someInput', '{"type":"someType"}')

    expect(res).toStrictEqual('{"type":"someType"}')
  })

  it('should return type and label if present', () => {
    const res = makeInitialCustomValue(
      'someInput',
      '{"type":"someType","label":"work"}'
    )

    expect(res).toStrictEqual('{"type":"someType","label":"work"}')
  })

  describe('for phone input', () => {
    const name = 'phone[0].phoneLabel'

    it('should not return a custom label if the value is supported', () => {
      const res = makeInitialCustomValue(name, '{"type":"fax","label":"work"}')

      expect(res).toStrictEqual(undefined)
    })

    it('should return the custom label', () => {
      const res = makeInitialCustomValue(name, '{"type":"someType"}')

      expect(res).toStrictEqual('{"type":"someType"}')
    })

    it('should return the custom label', () => {
      const res = makeInitialCustomValue(name, '{"label":"work"}')

      expect(res).toStrictEqual('{"label":"work"}')
    })

    it('should return the custom value if the type is not supported even if there is a label', () => {
      const res = makeInitialCustomValue(
        name,
        '{"type":"someType","label":"work"}'
      )

      expect(res).toStrictEqual('{"type":"someType","label":"work"}')
    })
  })
})
