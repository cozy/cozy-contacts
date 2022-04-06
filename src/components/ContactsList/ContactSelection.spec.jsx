import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import AppLike from '../../tests/Applike'
import { DumbContactSelection } from './ContactSelection'

const toggleSelection = jest.fn()

const setup = ({ selection = [] } = {}) => {
  return render(
    <AppLike>
      <DumbContactSelection
        contact={{ _id: 'contactId' }}
        selection={selection}
        toggleSelection={toggleSelection}
      />
    </AppLike>
  )
}

describe('ContactSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not be checked if contact is not selected', () => {
    const { getByRole } = setup({
      selection: [{ id: 'otherContactId' }]
    })

    expect(getByRole('checkbox')).not.toHaveAttribute('checked')
    expect(toggleSelection).not.toHaveBeenCalled()
  })

  it('should checked the checkbox if contact is selected', () => {
    const { getByRole } = setup({
      selection: [{ id: 'contactId' }]
    })

    expect(getByRole('checkbox')).toHaveAttribute('checked')
  })

  it('should trigger toggleSelection on click', () => {
    const { getByRole } = setup()

    fireEvent.click(getByRole('checkbox'))
    expect(toggleSelection).toHaveBeenCalled()
  })
})
