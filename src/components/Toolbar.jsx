import React, { Component } from 'react'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import ContactFormModal from './Modals/ContactFormModal'
import withModal from './HOCs/withModal'
import ContactCardModal from './Modals/ContactCardModal'
import ContactImportationModal from './ContactImportationModal/'

const style = { pointerEvents: 'all' }

class Toolbar extends Component {
  onCreateContact = contact => {
    this.props.hideModal()
    return this.props.showModal(<ContactCardModal id={contact.id} />)
  }

  showContactFormModal = () => {
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
    const { t } = this.props
    return (
      <div className="actions">
        <Button
          onClick={this.showContactFormModal}
          icon="plus"
          label={t('create_contact')}
          style={style}
        />
        <Button
          onClick={this.showContactImportationModal}
          label={t('empty.importation')}
          theme="secondary"
          icon="team"
          style={style}
        />
      </div>
    )
  }
}

export default translate()(withModal(Toolbar))
