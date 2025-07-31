import StarIcon from 'cozy-ui/transpiled/react/Icons/Star'
import StarOutlineIcon from 'cozy-ui/transpiled/react/Icons/StarOutline'

import { favorite } from './favorite'

describe('favorite', () => {
  const clearSelection = jest.fn()
  const client = {
    saveAll: jest.fn()
  }

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
  const notfavoriteSelection = [
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
  const mixedFavoriteSelection = [favoriteSelection[0], notfavoriteSelection[0]]

  beforeEach(() => {
    clearSelection.mockClear()
    client.saveAll.mockClear()
  })

  it('should return action with "add_favorite" label & "star-outline" icon', async () => {
    const action = favorite({
      client,
      selection: notfavoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action.label).toBe('SelectionBar.add_favorite')
    expect(action.icon).toStrictEqual(StarOutlineIcon)

    const action2 = favorite({
      client,
      selection: mixedFavoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action2.label).toBe('SelectionBar.add_favorite')
    expect(action2.icon).toStrictEqual(StarOutlineIcon)
  })

  it('should return action with "remove_favorite" label & "star" icon', async () => {
    const action = favorite({
      client,
      selection: favoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    expect(action.label).toBe('SelectionBar.remove_favorite')
    expect(action.icon).toStrictEqual(StarIcon)
  })

  it('Should call "saveAll" & "clearSelection" one time with "mixedFavoriteSelection"', async () => {
    const action = favorite({
      client,
      selection: mixedFavoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    await action.action()
    expect(client.saveAll).toHaveBeenCalledTimes(1)
    expect(clearSelection).toHaveBeenCalledTimes(1)
  })

  it('Should call "saveAll" & "clearSelection" one time with "notfavoriteSelection"', async () => {
    const action = favorite({
      client,
      selection: notfavoriteSelection,
      clearSelection,
      t: jest.fn(k => k)
    })

    await action.action()
    expect(client.saveAll).toHaveBeenCalledTimes(1)
    expect(clearSelection).toHaveBeenCalledTimes(1)
  })
})
