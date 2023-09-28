import flow from 'lodash/flow'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import { useClient } from 'cozy-client'
import SelectionBar from 'cozy-ui/transpiled/react/SelectionBar'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { trash as trashAction, selectAll as selectAllAction } from '../Actions'
import { makeActions } from '../Actions/helpers'
import ContactsDiplayedContext from '../Contexts/ContactsDiplayed'
import withModalContainer from '../HOCs/withModal'
import withSelection from '../Selection/selectionContainer'

const ContactsSelectionBar = ({
  selection,
  clearSelection,
  selectAll,
  showModal,
  hideModal
}) => {
  const client = useClient()
  const { t } = useI18n()
  const { contactsDisplayed } = useContext(ContactsDiplayedContext)

  const actions = makeActions([selectAllAction, trashAction], {
    contactsDisplayed,
    selectAll,
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
  selectAll: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default flow(withModalContainer, withSelection)(ContactsSelectionBar)
