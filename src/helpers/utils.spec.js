import { unicodeNumberToChar } from './utils'

describe('unicodeNumberToChar', () => {
  it('should return an array of characters', () => {
    const expectedResult = ['a', 'b', 'c', 'd', 'e', 'f']
    const result = unicodeNumberToChar(6, 97)
    expect(expectedResult).toEqual(result)
  })
})
