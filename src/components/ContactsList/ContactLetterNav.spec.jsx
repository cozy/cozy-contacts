import React from 'react'

import AppLike from '../../tests/Applike'

import ContactLetterNav from './ContactLetterNav'
import renderer from 'react-test-renderer'
describe('ContactLetterNav', () => {
  test('Should match the Letter nav snapshot', () => {
    const letters = [
      'EMPTY',
      '(',
      '#',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'R',
      'S',
      'T',
      'V',
      'W',
      'Y'
    ]
    const letterNavInstance = (
      <AppLike>
        <ContactLetterNav letters={letters} executeScroll={() => {}} />
      </AppLike>
    )
    const tree = renderer.create(letterNavInstance).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
