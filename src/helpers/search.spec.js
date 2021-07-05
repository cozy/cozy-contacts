import { scrollToSection, applyRefIfCurrentSection } from './search'

describe('scrollToCurrentSection', () => {
  it('should not throw given incorrect params', () => {
    expect(scrollToSection(undefined, undefined)).toEqual(undefined)
  })
})

describe('applyRefIfCurrentSection', () => {
  const ref = 'ref'

  it('should return ref given different casing', () => {
    expect(applyRefIfCurrentSection('A', 'a', ref)).toEqual({ ref })
  })

  it('should return an empty object given different letters', () => {
    expect(applyRefIfCurrentSection('A', 'b', ref)).toEqual({})
  })

  it('should return an empty object missing param 1', () => {
    expect(applyRefIfCurrentSection(undefined, 'b', ref)).toEqual({})
  })

  it('should return an empty object missing param 2', () => {
    expect(applyRefIfCurrentSection('A', undefined, ref)).toEqual({})
  })

  it('should return an empty object missing param 3', () => {
    expect(applyRefIfCurrentSection('A', 'b', undefined)).toEqual({})
  })
})
