import flow from 'lodash/flow'
import PropTypes from 'prop-types'
import React from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import SelectionBar from 'cozy-ui/transpiled/react/SelectionBar'

import { trash as trashAction } from '../Actions'
import { makeActions } from '../Actions/helpers'
import withModalContainer from '../HOCs/withModal'
import withSelection from '../Selection/selectionContainer'

const ContactsSelectionBar = ({
  selection,
  clearSelection,
  showModal,
  hideModal
}) => {
  const client = useClient()
  const { t } = useI18n()

  const actions = makeActions([trashAction], {
    selection,
    clearSelection,
    showModal,
    hideModal,
    client,
    t
  })

  return selection.length > 0 ? (
    <SelectionBar
      selected={selection}
      hideSelectionBar={clearSelection}
      actions={actions}
    />
  ) : null
}

ContactsSelectionBar.propTypes = {
  selection: PropTypes.array.isRequired,
  clearSelection: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default flow(withModalContainer, withSelection)(ContactsSelectionBar)
