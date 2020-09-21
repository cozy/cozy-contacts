import React from 'react'
import flow from 'lodash/flow'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Button from 'cozy-ui/transpiled/react/Button'
import Infos from 'cozy-ui/transpiled/react/Infos'
import Stack from 'cozy-ui/transpiled/react/Stack'

import withModal from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal/'
import ContactFormModal from '../Modals/ContactFormModal'
import ContactCardModal from '../Modals/ContactCardModal'
import StoreButton from './StoreButton'

import EmptyIcon from '../../assets/icons/empty-contact-list.svg'

const style = { pointerEvents: 'all' }

const SoonComponent = ({ t }) => (
  <div className="u-pt-1 u-pb-2">
    <Infos text={t('importation.available_soon')} icon="info" />
  </div>
)

class ContactsEmptyList extends React.Component {
  state = {
    hasConnector: false
  }

  afterConnection = result => {
    this.setState({ hasConnector: result !== null })
    setTimeout(() => window.location.reload(), 15000)
  }

  onCreateContact = contact => {
    this.props.hideModal()
    return this.props.showModal(<ContactCardModal id={contact.id} />)
  }

  showCreateContactModal = () => {
    this.props.showModal(
      <ContactFormModal
        afterMutation={this.onCreateContact}
        onClose={() => {}}
        title={this.props.t('create_contact')}
      />
    )
  }

  showContactImportationModal = () => {
    this.props.showModal(
      <ContactImportationModal closeAction={this.props.hideModal} />
    )
  }

  render() {
    const {
      t,
      breakpoints: { isDesktop }
    } = this.props
    const { hasConnector } = this.state

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
                    onClick={this.showContactImportationModal}
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
                onClick={this.showCreateContactModal}
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
}

export default flow(
  withBreakpoints(),
  translate(),
  withModal
)(ContactsEmptyList)
