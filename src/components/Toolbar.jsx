import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Button, Icon } from 'cozy-ui/react'

import { translate } from 'cozy-ui/react/I18n'
import { Query } from 'cozy-client'

import ContactFormModal from './Modals/ContactFormModal'
import withModal from './HOCs/withModal'
import ContactCardModalConnected from './Modals/ContactCardModalConnected'
import ContactImportationModal from './ContactImportationModal/'
const style = { pointerEvents: 'all' }
import IconTeam from '../assets/icons/team.svg'

class Toolbar extends Component {
  onCreateContact = contact => {
    this.props.hideModal()
    return this.props.showModal(
      <Query query={client => client.get('io.cozy.contacts', contact._id)}>
        {({ data: contact, fetchStatus }) => {
          return (
            <ContactCardModalConnected
              contact={contact}
              isloading={fetchStatus === 'loading'}
              groups={this.props.groups}
            />
          )
        }}
      </Query>
    )
  }

  render() {
    const { showModal, t } = this.props
    return (
      <div className="actions">
        <Button
          onClick={() => {
            showModal(
              <ContactFormModal
                onClose={() => {}}
                title={t('create_contact')}
                onCreateContact={this.onCreateContact}
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

Toolbar.propTypes = {
  groups: PropTypes.array.isRequired
}

export default translate()(withModal(Toolbar))
