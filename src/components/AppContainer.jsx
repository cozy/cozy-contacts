import cleanTrashedGroups from '../thunks/cleanTrashedGroups'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  cleanTrashedGroups: () => dispatch(cleanTrashedGroups())
})

export default connect(null, mapDispatchToProps)
