import { connect } from 'react-redux'
import { showModal } from '../../helpers/modalManager'

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    return dispatch(showModal(modal))
  }
})

const withModalContainer = component =>
  connect(
    null,
    mapDispatchToProps
  )(component)

export default withModalContainer
