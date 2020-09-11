/* global cozy */
import React from 'react'
import flow from 'lodash/flow'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Button from 'cozy-ui/transpiled/react/Button'
import Infos from 'cozy-ui/transpiled/react/Infos'

import withModal from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal/'
import ContactFormModal from '../Modals/ContactFormModal'
import ContactCardModal from '../Modals/ContactCardModal'
import ImportGoogleButton from '../Buttons/ImportGoogleButton'

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

  componentDidMount() {
    // cozy-client-js is needed for intents
    // we should refactor to not duplicate initialization code (see src/targets/browser/index.jsx)
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    cozy.client.init({
      cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
      token: data.cozyToken
    })
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
    const host = window.location.host
    const isToutaticeInstance =
      /\.mytoutatice\.cloud$/.test(host) ||
      /\.testcloud\.toutatice\.fr$/.test(host) //@TODO Some contexts don't have the google connector available. A better way to do this would be to query the list of available connectors.

    return (
      <div className="u-flex u-flex-column u-flex-items-center">
        <Empty
          className="contacts-empty"
          icon={EmptyIcon}
          title={t('empty.title')}
          text={hasConnector ? t('empty.after') : ''}
        >
          {!hasConnector && (
            <div className="u-flex u-flex-column u-mt-1">
              <span className="u-m-0 u-mb-half">
                <Button
                  className="u-m-0"
                  onClick={this.showContactImportationModal}
                  label={t('empty.importation')}
                  theme="secondary"
                  icon="team"
                  style={style}
                  extension="full"
                />
              </span>
              <span className="u-m-0 u-mb-half">
                {!isToutaticeInstance && (
                  <ImportGoogleButton onComplete={this.afterConnection} />
                )}
              </span>
              <span>
                <Button
                  subtle
                  theme="secondary"
                  onClick={this.showCreateContactModal}
                  icon={'plus'}
                  label={t('create_contact')}
                  style={style}
                />
              </span>
            </div>
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
