import React from 'react'
import PropTypes from 'prop-types'

const ContactsFilter = () => (
  <div>
    <select name="text">
      <option value="value1">Value 1</option>
      <option value="value2" selected>
        Value 2
      </option>
      <option value="value3">Value 3</option>
    </select>
  </div>
)

const ContactsHeader = ({ renderActions }) => (
  <div className="topbar">
    <div className="topbar__left">{false && <ContactsFilter />}</div>
    <div className="topbar__right">{renderActions()}</div>
  </div>
)
ContactsHeader.propTypes = {
  renderActions: PropTypes.func.isRequired
}

export default ContactsHeader
