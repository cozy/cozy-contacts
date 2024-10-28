import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'

import GroupsSelect from './GroupsSelect'
import Control from './SelectBox/Control'
import { createGroup, updateGroup } from '../../connections/allGroups'
import { groups } from '../../helpers/testData'
import AppLike from '../../tests/Applike'

jest.mock('../../connections/allGroups', () => ({
  createGroup: jest.fn(),
  updateGroup: jest.fn()
}))

const setup = () => {
  const root = render(
    <AppLike>
      <GroupsSelect
        value={[groups[0]]}
        allGroups={groups}
        onChange={() => {}}
        components={{ Control }}
      />
    </AppLike>
  )
  return { root }
}

describe('GroupsSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should display every groups and group creation button', () => {
    setup()

    act(() => {
      fireEvent.click(screen.getByText('Groups'))
    })

    for (const group of groups) {
      expect(screen.queryByText(group.name)).not.toBeNull()
    }
    expect(screen.queryByText('Create a group')).not.toBeNull()
  })

  it('should be able to create a new group', () => {
    setup()

    act(() => {
      fireEvent.click(screen.getByText('Groups'))
    })

    act(() => {
      fireEvent.click(screen.getByText('Create a group'))
    })

    // it should replace the button by an empty input
    let createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('')

    act(() => {
      // it should trigger creation function by pressing Enter key, and clear the input
      fireEvent.change(
        screen.getByRole('textbox', {
          id: 'createGroupInput'
        }),
        { target: { value: 'new group' } }
      )
    })

    createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('new group')

    act(() => {
      fireEvent.keyDown(
        screen.getByRole('textbox', {
          id: 'createGroupInput'
        }),
        { key: 'Enter', keyCode: '13' }
      )
    })

    expect(createGroup).toHaveBeenCalled()
    createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('')
  })

  it("shouldn't be able to create a new group", () => {
    setup()

    act(() => {
      fireEvent.click(screen.getByText('Groups'))
    })

    act(() => {
      fireEvent.click(screen.getByText('Create a group'))
    })

    // it should replace the button by an empty input
    let createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('')

    act(() => {
      // it should trigger creation function by pressing Enter key, and clear the input
      fireEvent.change(
        screen.getByRole('textbox', {
          id: 'createGroupInput'
        }),
        { target: { value: '' } }
      )
    })

    createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('')

    act(() => {
      fireEvent.keyDown(
        screen.getByRole('textbox', {
          id: 'createGroupInput'
        }),
        { key: 'Enter', keyCode: '13' }
      )
    })

    expect(createGroup).not.toHaveBeenCalled()
    createGroupInput = screen.queryByRole('textbox', {
      id: 'createGroupInput'
    })
    expect(createGroupInput).not.toBeNull()
    expect(createGroupInput.value).toBe('')
  })

  it('should be able to rename a group', () => {
    setup()

    act(() => {
      // it should replace the field by input with group name as value
      fireEvent.click(screen.getByText('Groups'))
    })

    act(() => {
      fireEvent.click(
        screen.getByTestId(`ActionsOption_${groups[0].name}-icon_pen`)
      )
    })

    let editGroupInput = screen.queryByRole('textbox', {
      id: 'editGroupInput'
    })
    expect(editGroupInput).not.toBeNull()
    expect(editGroupInput.value).toBe(groups[0].name)

    act(() => {
      // it should trigger rename function by pressing Enter key, and remove input
      fireEvent.keyDown(
        screen.getByRole('textbox', {
          id: 'editGroupInput'
        }),
        { key: 'Enter', keyCode: '13' }
      )
    })

    expect(updateGroup).toHaveBeenCalled()
    editGroupInput = screen.queryByRole('textbox', {
      id: 'editGroupInput'
    })
    expect(editGroupInput).toBeNull()
  })
})
