const initialState = {
  selection: []
}
import findIndex from 'lodash/findIndex'

const selection = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SELECTION_CLEAR':
      return { ...initialState }
    case 'SELECTION_TOGGLE':
      const index = findIndex(state.selection, s => s.id === payload.data._id)

      return index === -1
        ? { selection: [...state.selection, payload.data] }
        : {
            selection: [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1)
            ]
          }

    default:
      return state
  }
}

export default selection
