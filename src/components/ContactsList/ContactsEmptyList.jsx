import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Button from 'cozy-ui/transpiled/react/Button'
import Infos from 'cozy-ui/transpiled/react/Infos'
import Stack from 'cozy-ui/transpiled/react/Stack'

import withModal from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal/'
import ContactFormModal from '../Modals/ContactFormModal'
import ContactCardModal from '../Modals/ContactCardModal'
import StoreButton from '../Common/StoreButton'
import EmptyIcon from '../../assets/icons/empty-contact-list.svg'

const style = { pointerEvents: 'all' }

const SoonComponent = ({ t }) => (
  <div className="u-pt-1 u-pb-2">
    <Infos text={t('importation.available_soon')} icon="info" />
  </div>
)

const ContactsEmptyList = ({ hideModal, showModal }) => {
  const { t } = useI18n()
  const { isDesktop } = useBreakpoints()

  const [hasConnector, setHasConnector] = useState(false)

  const afterConnection = result => {
    setHasConnector(result !== null)
    setTimeout(() => window.location.reload(), 15000)
  }

  const onCreateContact = contact => {
    hideModal()
    return showModal(<ContactCardModal id={contact.id} />)
  }

  const showCreateContactModal = () => {
    showModal(
      <ContactFormModal
        afterMutation={onCreateContact}
        onClose={() => {}}
        title={t('create_contact')}
      />
    )
  }

  const showContactImportationModal = () => {
    showModal(<ContactImportationModal closeAction={hideModal} />)
  }

  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Empty
        className="contacts-empty"
        icon={EmptyIcon}
        title={t('empty.title')}
        text={hasConnector ? t('empty.after') : ''}
      >
        {!hasConnector && (
          <>
            <Stack spacing="xs" className="u-mt-1">
              <div>
                <Button
                  onClick={showContactImportationModal}
                  label={t('empty.import_vcard')}
                  theme="secondary"
                  icon="team"
                  style={style}
                  extension="full"
                />
              </div>
              <div>
                <StoreButton />
              </div>
            </Stack>
            <Button
              className="u-mt-1-half"
              subtle
              theme="secondary"
              onClick={showCreateContactModal}
              icon="plus"
              label={t('create_contact')}
              style={style}
            />
          </>
        )}
        {!isDesktop && <SoonComponent t={t} />}
      </Empty>
      {isDesktop && <SoonComponent t={t} />}
    </div>
  )
}

ContactsEmptyList.propTypes = {
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default withModal(ContactsEmptyList)
