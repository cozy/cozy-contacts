import { connect } from 'react-redux'
import { showModal, hideModal } from '../../helpers/modalManager'

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    return dispatch(showModal(modal))
  },
  hideModal: () => {
    return dispatch(hideModal())
  }
})

const withModalContainer = component =>
  connect(null, mapDispatchToProps)(component)

export default withModalContainer
