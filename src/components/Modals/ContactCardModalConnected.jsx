import React, { Component } from 'react'
import ContactCardModal from './ContactCardModal'
import withModal from '../HOCs/withModal'
class ContactCardModalConnected extends Component {
  render() {
    return <ContactCardModal {...this.props} onClose={this.props.hideModal} />
  }
}

export default withModal(ContactCardModalConnected)
