import React from 'react'
import { render } from '@testing-library/react'

import SearchByLetter from './SearchByLetter'
import AppLike from '../../tests/Applike'

const letters = ['a', 'g', 'y', 'empty']
const setup = () => {
  const root = render(
    <AppLike>
      <SearchByLetter letters={letters} />
    </AppLike>
  )
  return { root }
}

describe('SearchByLetter Inputs', () => {
  it('should retur true if button letter is not in array letters', () => {
    const { root } = setup()
    const { getAllByRole } = root
    const buttons = getAllByRole('button')

    buttons.forEach(button => {
      const value = button.getAttribute('data-value')
      if (letters.includes(value)) {
        expect(button.getAttribute('aria-disabled')).toBeFalsy()
      }
    })
  })
})
