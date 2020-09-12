const initialState = {
  filter: null
}

const filter = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILTER_UPDATE':
      return {
        filter: payload.data
      }

    default:
      return state
  }
}

export default filter
