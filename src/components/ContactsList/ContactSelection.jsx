import React, { Component } from 'react'
import find from 'lodash/find'
import PropTypes from 'prop-types'

import { fullContactPropTypes } from '../ContactPropTypes'
import withSelection from '../Selection/selectionContainer'

class ContactSelection extends Component {
  render() {
    return (
      <div
        className="contact-selection"
        onClick={e => {
          e.stopPropagation()
          this.props.toggleSelection(this.props.contact)
        }}
      >
        <span data-input="checkbox">
          <input
            type="checkbox"
            checked={
              find(
                this.props.selection,
                s => s.id === this.props.contact._id
              ) !== undefined
            }
            readOnly
          />
          <label />
        </span>
      </div>
    )
  }
}
const ContactWithSelection = withSelection(ContactSelection)
ContactSelection.propTypes = {
  contact: fullContactPropTypes.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired
}
export default ContactWithSelection
