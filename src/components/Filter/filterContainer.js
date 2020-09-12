import { connect } from 'react-redux'

const mapStateToProps = state => {
  const filter = state.appReducers.filter || []
  return {
    filter: filter.filter
  }
}

const mapDispatchToProps = dispatch => ({
  updateFilter: character =>
    dispatch({
      type: 'FILTER_UPDATE',
      payload: {
        data: character
      }
    })
})

const filterContainer = component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)

export default filterContainer
