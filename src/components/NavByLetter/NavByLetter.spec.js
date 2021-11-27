import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import NavByLetter from './NavByLetter'
import AppLike from '../../tests/Applike'

const usedLetters = 'acdeglmntrwx'.split('')

describe('NavByLetter', () => {
  it('should use a navigation with 26 buttons', () => {
    const onClickLetter = jest.fn()
    render(
      <AppLike>
        <NavByLetter usedLetters={usedLetters} onClickLetter={onClickLetter} />
      </AppLike>
    )
    expect(screen.getByRole('navigation')).toBeTruthy()
    expect(screen.getAllByRole('button').length).toBe(26)
  })

  it('should have disabled buttons only for unused letters', () => {
    const onClickLetter = jest.fn()
    render(
      <AppLike>
        <NavByLetter usedLetters={usedLetters} onClickLetter={onClickLetter} />
      </AppLike>
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      if (usedLetters.includes(button.textContent)) {
        expect(button).not.toBeDisabled()
      } else {
        expect(button).toBeDisabled()
      }
    })
  })

  it('should call onClickLetter with the right argument', () => {
    const onClickLetter = jest.fn()
    render(
      <AppLike>
        <NavByLetter usedLetters={usedLetters} onClickLetter={onClickLetter} />
      </AppLike>
    )

    userEvent.click(screen.getByRole('button', { name: /a/i }))
    expect(onClickLetter).toHaveBeenCalledWith('a')

    userEvent.click(screen.getByRole('button', { name: /l/i }))
    expect(onClickLetter).toHaveBeenCalledWith('l')
  })
})
