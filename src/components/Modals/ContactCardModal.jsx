import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { flow } from 'lodash'

import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalContent
} from 'cozy-ui/transpiled/react/Modal'

import { getConnectedAccounts } from '../../helpers/contacts'
import withContactsMutations from '../../connections/allContacts'
import ContactCard from '../ContactCard/ContactCard'
import SpinnerContact from '../Common/Spinner'
import ContactFormModal from './ContactFormModal'
import ContactGroups from '../ContactCard/ContactGroups'
import { buildContactQuery, queryAllGroups } from '../../helpers/queries'

const ContactCardModal = props => {
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

  const { onClose, t, id } = props

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
      {dataHaveBeenLoaded ? (
        <DumbContactCardModal
          editMode={editMode}
          contact={resultContactById.data}
          allGroups={resultAllGroups.data}
          t={t}
          toggleConfirmDeleteModal={toggleConfirmDeleteModal}
          toggleEditMode={toggleEditMode}
          shouldDisplayConfirmDeleteModal={shouldDisplayConfirmDeleteModal}
          deleteContact={deleteContact}
        />
      ) : (
        <SpinnerContact size="xxlarge" />
      )}
    </Modal>
  )
}

export const DumbContactCardModal = ({
  editMode,
  contact,
  allGroups,
  t,
  toggleConfirmDeleteModal,
  toggleEditMode,
  shouldDisplayConfirmDeleteModal,
  deleteContact
}) => {
  return (
    <>
      {!editMode && (
        <ContactCard
          contact={contact}
          allGroups={allGroups}
          renderHeader={children => (
            <ModalHeader className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s u-flex-justify-between">
              {children}
              <div className="u-flex u-flex-row u-ml-0-s u-mr-3 u-mr-0-s">
                <ContactGroups contact={contact} allGroups={allGroups} />
                <Button
                  theme="secondary"
                  extension="narrow"
                  icon="rename"
                  iconOnly
                  label={t('edit')}
                  size="small"
                  onClick={toggleEditMode}
                />
                <Button
                  theme="secondary"
                  extension="narrow"
                  icon="trash"
                  iconOnly
                  label={t('delete')}
                  size="small"
                  onClick={toggleConfirmDeleteModal}
                />
              </div>
            </ModalHeader>
          )}
          renderBody={children => <ModalContent>{children}</ModalContent>}
        />
      )}
      {editMode && (
        <ContactFormModal
          contact={contact}
          onClose={toggleEditMode}
          title={t('edit-contact')}
          afterMutation={toggleEditMode}
        />
      )}

      {shouldDisplayConfirmDeleteModal && (
        <Modal
          into="body"
          title={t('delete-confirmation.title', {
            smart_count: 1
          })}
          description={t(
            getConnectedAccounts(contact).length > 0
              ? 'delete-confirmation.description-google'
              : 'delete-confirmation.description-simple',
            {
              smart_count: 1
            }
          )}
          primaryText={t('delete')}
          primaryType="danger"
          primaryAction={() => deleteContact(contact)}
          secondaryText={t('cancel')}
          secondaryAction={toggleConfirmDeleteModal}
          dismissAction={toggleConfirmDeleteModal}
        />
      )}
    </>
  )
}

ContactCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func,
  isloading: PropTypes.bool
}

export default flow(
  withContactsMutations,
  translate()
)(ContactCardModal)
