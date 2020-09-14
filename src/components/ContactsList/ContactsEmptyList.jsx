import React from 'react'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Button from 'cozy-ui/transpiled/react/Button'
import Infos from 'cozy-ui/transpiled/react/Infos'
import className from 'classnames'
import withModalContainer from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal/'
import ContactFormModal from '../Modals/ContactFormModal'
import ContactCardModal from '../Modals/ContactCardModal'
import ImportGoogleButton from '../Buttons/ImportGoogleButton'

import EmptyIcon from '../../assets/icons/empty-contact-list.svg'

const style = { pointerEvents: 'all' }

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
  render() {
    const { hasConnector } = this.state
    const host = window.location.host
    const isToutaticeInstance =
      /\.mytoutatice\.cloud$/.test(host) ||
      /\.testcloud\.toutatice\.fr$/.test(host) //@TODO Some contexts don't have the google connector available. A better way to do this would be to query the list of available connectors.
    const {
      t,
      showModal,
      breakpoints: { isDesktop }
    } = this.props
    const SoonComponent = (
      <div
        className={className('u-pt-1 u-pb-2', {
          'contacts-empty-soon': !isDesktop
        })}
      >
        <Infos text={t('importation.available_soon')} icon="info" />
      </div>
    )
    return (
      <div className="contacts-empty-container">
        <Empty
          className="contacts-empty"
          icon={EmptyIcon}
          title={t('empty.title')}
          text={hasConnector ? t('empty.after') : ''}
        >
          {!hasConnector && (
            <div className="contacts-empty-actions-wrapper">
              <span className="contacts-empty-action">
                <Button
                  className="contacts-empty-button"
                  onClick={() => {
                    showModal(
                      <ContactImportationModal
                        closeAction={this.props.hideModal}
                      />
                    )
                  }}
                  label={t('empty.importation')}
                  theme="secondary"
                  icon="team"
                  style={style}
                />
              </span>
              <span className="contacts-empty-action">
                {!isToutaticeInstance && (
                  <ImportGoogleButton onComplete={this.afterConnection} />
                )}
              </span>
              <span>
                <Button
                  subtle
                  theme="secondary"
                  onClick={() => {
                    showModal(
                      <ContactFormModal
                        afterMutation={this.onCreateContact}
                        onClose={() => {}}
                        title={t('create_contact')}
                      />
                    )
                  }}
                  icon={'plus'}
                  label={t('create_contact')}
                  style={style}
                />
              </span>
            </div>
          )}
          {!isDesktop && SoonComponent}
        </Empty>
        {isDesktop && SoonComponent}
      </div>
    )
  }
}

export default withBreakpoints()(
  translate()(withModalContainer(ContactsEmptyList))
)
