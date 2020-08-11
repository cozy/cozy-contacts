import { connect } from 'react-redux'

const mapStateToProps = state => {
  const selection = state.appReducers.selection || []
  const filterLetter = state.appReducers.filter.filterLetter || null
  return {
    selection: selection.selection,
    filterLetter
  }
}

const mapDispatchToProps = dispatch => ({
  clearSelection: () =>
    dispatch({
      type: 'SELECTION_CLEAR'
    }),

  selectAll: contacts =>
    dispatch({
      contacts,
      type: 'SELECT_ALL_CONTACTS'
    }),

  toggleSelection: contact =>
    dispatch({
      type: 'SELECTION_TOGGLE',
      payload: {
        data: contact
      }
    })
})

const selectionContainer = component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)

export default selectionContainer
