import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'cozy-ui/transpiled/react/Checkbox'

import { fullContactPropTypes } from '../ContactPropTypes'
import withSelection from '../Selection/selectionContainer'

export const DumbContactSelection = ({
  contact,
  selection,
  toggleSelection
}) => {
  const isChecked = selection.some(s => s.id === contact._id)

  return (
    <Checkbox
      onClick={e => {
        e.stopPropagation()
        toggleSelection(contact)
      }}
      checked={isChecked}
      readOnly
    />
  )
}

DumbContactSelection.propTypes = {
  contact: fullContactPropTypes.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired
}

export default withSelection(DumbContactSelection)
