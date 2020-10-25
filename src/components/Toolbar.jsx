import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import withModal from './HOCs/withModal'
import ContactFormModal from './Modals/ContactFormModal'
import ContactCardModal from './Modals/ContactCardModal'
import ImportDropdown from './Common/ImportDropdown'

const Toolbar = ({ showModal, hideModal }) => {
  const { t } = useI18n()

  const onCreateContact = contact => {
    hideModal()
    return showModal(<ContactCardModal id={contact.id} />)
  }

  const showContactFormModal = () => {
    showModal(
      <ContactFormModal
        afterMutation={onCreateContact}
        onClose={() => {}}
        title={t('create_contact')}
      />
    )
  }

  return (
    <div className="actions">
      <Button onClick={showContactFormModal} label={t('create_contact')} />
      <ImportDropdown />
    </div>
  )
}

Toolbar.propTypes = {
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default withModal(Toolbar)
