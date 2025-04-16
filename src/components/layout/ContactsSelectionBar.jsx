import flow from 'lodash/flow'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import { useClient } from 'cozy-client'
import ActionsBar from 'cozy-ui/transpiled/react/ActionsBar'
import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { favorite as favoriteAction } from '../Actions/favorite'
import { selectAll as selectAllAction } from '../Actions/selectAll'
import { trash as trashAction } from '../Actions/trash'
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

  const actions = makeActions([selectAllAction, trashAction, favoriteAction], {
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
    <ActionsBar docs={selection} actions={actions} onClose={clearSelection} />
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
