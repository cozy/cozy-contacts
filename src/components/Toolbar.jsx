import React, { Component } from 'react'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import ContactFormModal from './Modals/ContactFormModal'
import withModal from './HOCs/withModal'
import ContactCardModal from './Modals/ContactCardModal'
import ContactImportationModal from './ContactImportationModal/'
import IconTeam from '../assets/icons/team.svg'

const style = { pointerEvents: 'all' }

class Toolbar extends Component {
  onCreateContact = contact => {
    this.props.hideModal()
    return this.props.showModal(<ContactCardModal id={contact.id} />)
  }

  render() {
    const { showModal, t } = this.props
    return (
      <div className="actions">
        <Button
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
        <Button
          onClick={() => {
            showModal(
              <ContactImportationModal closeAction={this.props.hideModal} />
            )
          }}
          label={t('empty.importation')}
          theme="secondary"
          icon={<Icon icon={IconTeam} />}
          style={style}
        />
      </div>
    )
  }
}

Toolbar.propTypes = {}

export default translate()(withModal(Toolbar))
