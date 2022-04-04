import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'

import Checkbox from 'cozy-ui/transpiled/react/Checkbox'

import { fullContactPropTypes } from '../ContactPropTypes'
import withSelection from '../Selection/selectionContainer'

const ContactSelection = ({ contact, selection, toggleSelection }) => {
  return (
    <Checkbox
      onClick={e => {
        e.stopPropagation()
        toggleSelection(contact)
      }}
      checked={find(selection, s => s.id === contact._id) !== undefined}
      readOnly
    />
  )
}

ContactSelection.propTypes = {
  contact: fullContactPropTypes.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired
}

export default withSelection(ContactSelection)
