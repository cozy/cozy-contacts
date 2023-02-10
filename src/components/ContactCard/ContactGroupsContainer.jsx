import { connect } from 'react-redux'
import cleanTrashedGroups from '../../thunks/cleanTrashedGroups'

const mapDispatchToProps = dispatch => ({
  cleanTrashedGroups: () => dispatch(cleanTrashedGroups())
})

export default connect(null, mapDispatchToProps)
