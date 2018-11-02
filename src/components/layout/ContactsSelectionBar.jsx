import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { SelectionBar } from 'cozy-ui/react'
import withSelection from '../Selection/selectionContainer'

class ContactsSelectionBar extends Component {
  render() {
    const { selection, clearSelection, trashAction } = this.props
    return selection.length > 0 ? (
      <SelectionBar
        selected={selection}
        hideSelectionBar={clearSelection}
        actions={{
          trash: {
            action: () => {
              Promise.all(selection.map(trashAction)).then(clearSelection)
            }
          }
        }}
      />
    ) : null
  }
}
ContactsSelectionBar.propTypes = {
  selection: PropTypes.array.isRequired,
  hideSelectionBar: PropTypes.func.isRequired,
  trashAction: PropTypes.func.isRequired
}

export default withSelection(ContactsSelectionBar)
