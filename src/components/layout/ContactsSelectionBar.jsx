import React from 'react'
import { PropTypes } from 'prop-types'
import { SelectionBar } from 'cozy-ui/react'

const ContactsSelectionBar = ({ selection, hideSelectionBar, trashAction }) =>
  selection.length > 0 ? (
    <SelectionBar
      selected={selection}
      hideSelectionBar={hideSelectionBar}
      actions={{
        trash: {
          action: () => {
            Promise.all(selection.map(trashAction)).then(hideSelectionBar)
          }
        }
      }}
    />
  ) : null
ContactsSelectionBar.propTypes = {
  selection: PropTypes.array.isRequired,
  hideSelectionBar: PropTypes.func.isRequired,
  trashAction: PropTypes.func.isRequired
}

export default ContactsSelectionBar
