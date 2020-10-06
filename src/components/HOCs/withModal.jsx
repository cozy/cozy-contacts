import { connect } from 'react-redux'
import { showModal, hideModal } from '../../helpers/modalManager'

const mapStateToProps = state => ({
  ...state.appReducers.ui
})

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    return dispatch(showModal(modal))
  },
  hideModal: () => {
    return dispatch(hideModal())
  }
})

const withModalContainer = component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)

export default withModalContainer
