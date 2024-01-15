import { filterWithRemaining } from './filterWithRemaining'

const mockNumberArray = [1, 2, 3, 4]

describe('filterWithRemaining', () => {
  it('should be return even & odd numbers separately', () => {
    const testEvenFunction = item => item % 2 === 0
    const res = filterWithRemaining(mockNumberArray, testEvenFunction)

    expect(res).toStrictEqual({
      itemsFound: [2, 4],
      remainingItems: [1, 3]
    })
  })

  it('should be return the digit present at index 1 separately from the others', () => {
    const testFunction = (_, index) => index === 1
    const res = filterWithRemaining(mockNumberArray, testFunction)

    expect(res).toStrictEqual({
      itemsFound: [2],
      remainingItems: [1, 3, 4]
    })
  })
})
