import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import Modal from 'cozy-ui/transpiled/react/Modal'

import DumbContactCardModal from './DumbContactCardModal'
import withContactsMutations from '../../connections/allContacts'
import SpinnerContact from '../Common/Spinner'
import { buildContactQuery, queryAllGroups } from '../../helpers/queries'

const ContactCardModal = props => {
  const { onClose, id } = props
  const [editMode, setEditMode] = useState(false)
  const [
    shouldDisplayConfirmDeleteModal,
    setShouldDisplayConfirmDeleteModal
  ] = useState(false)

  const toggleConfirmDeleteModal = () => {
    setShouldDisplayConfirmDeleteModal(!shouldDisplayConfirmDeleteModal)
  }

  const deleteContact = async (contactParam = null) => {
    const { contact, deleteContact, onDeleteContact, onClose } = props
    onClose && onClose()
    await deleteContact(contactParam ? contactParam : contact)
    onDeleteContact && onDeleteContact(contactParam ? contactParam : contact)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const queryContactById = buildContactQuery(id)
  const resultContactById = useQuery(
    queryContactById.definition,
    queryContactById.options
  )
  const resultAllGroups = useQuery(
    queryAllGroups.definition,
    queryAllGroups.options
  )

  const dataHaveBeenLoaded =
    (!isQueryLoading(resultContactById) ||
      hasQueryBeenLoaded(resultContactById)) &&
    (!isQueryLoading(resultAllGroups) || hasQueryBeenLoaded(resultAllGroups))

  return (
    <Modal into="body" dismissAction={onClose} size="xlarge" mobileFullscreen>
      {!dataHaveBeenLoaded ? (
        <SpinnerContact size="xxlarge" />
      ) : (
        <DumbContactCardModal
          editMode={editMode}
          contact={resultContactById.data}
          allGroups={resultAllGroups.data}
          toggleConfirmDeleteModal={toggleConfirmDeleteModal}
          toggleEditMode={toggleEditMode}
          shouldDisplayConfirmDeleteModal={shouldDisplayConfirmDeleteModal}
          deleteContact={deleteContact}
        />
      )}
    </Modal>
  )
}

ContactCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func,
  isloading: PropTypes.bool
}

export default withContactsMutations(ContactCardModal)
