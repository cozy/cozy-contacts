import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'cozy-ui/react/Avatar'
import find from 'lodash/find'
import { getInitials } from '../../helpers/contacts'
import ContactCardModal from '../Modals/ContactCardModal'
import withModalContainer from '../HOCs/withModal'
import contactPropTypes from '../ContactPropTypes'
import withSelection from '../Selection/selectionContainer'

const ContactIdentity = ({ name, myself }) => (
  <div className="contact-identity">
    <Avatar text={getInitials(name).toUpperCase()} size="small" />
    <ContactName firstname={name.givenName} lastname={name.familyName} />
    {myself && <MyselfMarker />}
  </div>
)
ContactIdentity.propTypes = {
  name: contactPropTypes.name.isRequired,
  myself: PropTypes.bool
}
ContactIdentity.defaultProps = {
  myself: false
}

const ContactName = ({ firstname, lastname }) => (
  <div>
    <span className="contact-firstname">{firstname}</span>
    &nbsp;
    <span className="contact-lastname">{lastname}</span>
  </div>
)
ContactName.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  me: PropTypes.bool
}
ContactName.defaultProps = {
  firstname: '',
  lastname: '',
  me: false
}

const MyselfMarker = (props, { t }) => (
  <span className="contact-myself">({t('me')})</span>
)

const ContactPhone = ({ phone }) => <div className="contact-phone">{phone}</div>
ContactPhone.propTypes = {
  phone: PropTypes.string
}
ContactPhone.defaultProps = {
  phone: '—'
}

const getPrimaryOrFirst = (arr = [{}]) => arr.find(obj => obj.primary) || arr[0]

const ContactEmail = ({ email }) => <div className="contact-email">{email}</div>
ContactEmail.propTypes = {
  email: PropTypes.string
}
ContactEmail.defaultProps = {
  email: '—'
}

class ContactSelection extends Component {
  render() {
    return (
      <div
        className="contact-selection"
        onClick={e => {
          e.stopPropagation()
          this.props.toggleSelection(this.props.contact)
        }}
      >
        <span data-input="checkbox">
          <input
            type="checkbox"
            checked={
              find(
                this.props.selection,
                s => s.id === this.props.contact._id
              ) !== undefined
            }
            readOnly
          />
          <label />
        </span>
      </div>
    )
  }
}
const ContactWithSelection = withSelection(ContactSelection)
ContactSelection.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired
}

class ContactRow extends Component {
  render() {
    const { id, contact } = this.props
    const { number: phone } = getPrimaryOrFirst(contact.phone) || {
      number: undefined
    }

    const { address: email } = getPrimaryOrFirst(contact.email) || {
      address: undefined
    }
    const name = contact.name || {}
    const isMyself = contact.metadata ? !!contact.metadata.me : false

    const { showModal, groups } = this.props
    return (
      <div
        className="contact"
        onClick={() =>
          showModal(
            <ContactCardModal
              onClose={this.hideContactCard}
              id={id}
              groups={groups}
            />
          )
        }
      >
        <ContactWithSelection contact={contact} />
        <ContactIdentity
          name={name}
          myself={isMyself}
          groups={this.props.groups}
        />
        <ContactPhone phone={phone} />
        <ContactEmail email={email} />
      </div>
    )
  }
}
ContactRow.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    email: PropTypes.arrayOf(contactPropTypes.email.isRequired).isRequired,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    metadata: contactPropTypes.metadata
  }).isRequired,

  onClick: PropTypes.func,
  groups: PropTypes.array.isRequired
}
ContactRow.defaultProps = {
  selection: null,
  onClick: null
}

export default withModalContainer(ContactRow)
