import { favorite } from './favorite'
import { updateContact } from '../../connections/allContacts'

jest.mock('../../connections/allContacts', () => ({
  updateContact: jest.fn()
}))

describe('favorite', () => {
  const clearSelection = jest.fn()

  const favoriteSelection = [
    {
      _id: '000',
      cozyMetadata: {
        favorite: true
      }
    },
    {
      _id: '001',
      cozyMetadata: {
        favorite: true
      }
    }
  ]
  const unfavoriteSelection = [
    {
      _id: '100',
      cozyMetadata: {
        favorite: false
      }
    },
    {
      _id: '101',
      cozyMetadata: {
        favorite: false
      }
    }
  ]
  const mixedSelection = [favoriteSelection[0], unfavoriteSelection[0]]

  it('should return action with "add_favorite" label & "star-outline" icon', async () => {
    const action = favorite({
      selection: unfavoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action.label).toBe('SelectionBar.add_favorite')
    expect(action.icon).toBe('star-outline')

    const action2 = favorite({
      selection: mixedSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action2.label).toBe('SelectionBar.add_favorite')
    expect(action2.icon).toBe('star-outline')
  })

  it('should return action with "remove_favorite" label & "star" icon', async () => {
    const action = favorite({
      selection: favoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action.label).toBe('SelectionBar.remove_favorite')
    expect(action.icon).toBe('star')
  })

  it('Should only update not favorite contacts', async () => {
    const action = favorite({
      selection: mixedSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action.label).toBe('SelectionBar.add_favorite')
    expect(action.icon).toBe('star-outline')
    await action.action()
    expect(updateContact).toHaveBeenCalledTimes(1)
    expect(clearSelection).toHaveBeenCalledTimes(1)
  })
})
