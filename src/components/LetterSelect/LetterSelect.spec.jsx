import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { groups, letters } from '../../helpers/testData'
import LetterSelect from './LetterSelect'
import AppLike from '../../tests/Applike'
import Control from './SelectBox/Control'

const setup = () => {
  const root = render(
    <AppLike>
      <LetterSelect
        value={{name: 'Go to letter...'}}
        allLetters={letters}
        onChange={() => {console.log('Coucou')}}
        components={{ Control }}
      />
    </AppLike>
  )
  return { root }
}

describe('LetterSelect', () => {
  it('should display every letter available (section available)', () => {
    const { root } = setup()
    const { getByText } = root

    fireEvent.click(getByText('Go to letter...'))
    letters.map(letter => expect(getByText(letter.name)).toBeTruthy())
  })
})
