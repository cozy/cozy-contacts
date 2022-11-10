import React from 'react'
import PropTypes from 'prop-types'

import Buttons from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import Icon from 'cozy-ui/transpiled/react/Icon'
import withModal from './HOCs/withModal'
import ContactFormModal from './Modals/ContactFormModal'
import ContactCardModal from './Modals/ContactCardModal'
import ImportDropdown from './Common/ImportDropdown'

const style = { pointerEvents: 'all' }

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
      <Buttons
        onClick={showContactFormModal}
        startIcon={<Icon icon={PlusIcon} />}
        label={t('create_contact')}
        style={style}
        className="u-mr-half"
      />
      <ImportDropdown />
    </div>
  )
}

Toolbar.propTypes = {
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default withModal(Toolbar)
