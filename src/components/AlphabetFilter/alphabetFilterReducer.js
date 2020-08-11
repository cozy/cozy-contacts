const initialState = {
  filterLetter: null
}

const filter = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILTER_BY_LETTER':
      return {
        filterLetter: payload.filterLetter
      }
    case 'RESET_FILTER':
      return { ...initialState }
    default:
      return state
  }
}

export default filter
