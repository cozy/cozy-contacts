import React from 'react'
import PropTypes from 'prop-types'

const ContactHeaderRow = React.forwardRef((props, ref) => (<div ref={ref} className="divider">{props.header}</div>))

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
}
export default ContactHeaderRow
