import { connect } from 'react-redux'

const mapStateToProps = state =>
  state.appReducers.filter ? state.appReducers.filter : null

const mapDispatchToProps = dispatch => ({
  filterByLetter: letter =>
    dispatch({
      type: 'FILTER_BY_LETTER',
      payload: {
        filterLetter: letter
      }
    }),
  resetFilter: () =>
    dispatch({
      type: 'RESET_FILTER'
    })
})

const alphabetFilterContainer = component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)

export default alphabetFilterContainer
