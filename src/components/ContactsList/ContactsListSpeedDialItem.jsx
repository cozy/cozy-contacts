import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import withSelection from '../Selection/selectionContainer'
import SpeedDialContext from '../Contexts/SpeedDial'

const ContactsListSpeedDialItem = ({ item }) => {
  const { setSpeedDialValue } = useContext(SpeedDialContext)

  return (
    <div className="list-speed-dial-item">
      <button
        onClick={() => {
          setSpeedDialValue(item)
        }}
      >
        {item}
      </button>
    </div>
  )
}

ContactsListSpeedDialItem.propTypes = {
  filteredContacts: PropTypes.array.isRequired
}
ContactsListSpeedDialItem.defaultProps = {}

export default withSelection(ContactsListSpeedDialItem)
