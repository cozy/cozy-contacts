import { connect } from 'react-redux'
import { showModal } from '../../helpers/modalManager'

const mapDispatchToProps = dispatch => ({
  displayModal: modal => dispatch(showModal(modal))
})

const withModalContainer = component =>
  connect(
    null,
    mapDispatchToProps
  )(component)

export default withModalContainer
