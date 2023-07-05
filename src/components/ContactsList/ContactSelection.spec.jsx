import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'

import { DumbContactSelection } from './ContactSelection'
import AppLike from '../../tests/Applike'

const toggleSelection = jest.fn()

const setup = ({ selection = [] } = {}) => {
  const root = render(
    <AppLike>
      <DumbContactSelection
        contact={{ _id: 'contactId' }}
        selection={selection}
        toggleSelection={toggleSelection}
      />
    </AppLike>
  )
  return { root }
}

describe('ContactSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not be checked if contact is not selected', () => {
    setup({
      selection: [{ id: 'otherContactId' }]
    })

    const checkbox = screen.queryByRole('checkbox')
    expect(checkbox).not.toBeNull()
    expect(checkbox).not.toHaveAttribute('checked')
    expect(toggleSelection).not.toHaveBeenCalled()
  })

  it('should checked the checkbox if contact is selected', () => {
    setup({
      selection: [{ id: 'contactId' }]
    })

    const checkbox = screen.queryByRole('checkbox')
    expect(checkbox).not.toBeNull()
    expect(checkbox).toHaveAttribute('checked')
  })

  it('should trigger toggleSelection on click', () => {
    setup()

    act(() => {
      fireEvent.click(screen.getByRole('checkbox'))
    })

    expect(toggleSelection).toHaveBeenCalled()
  })
})
