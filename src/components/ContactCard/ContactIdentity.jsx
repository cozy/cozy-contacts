import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "cozy-ui/react";
import contactPropTypes from "../ContactPropTypes";
import ContactGroupManager from "../ContactGroups/ContactGroupManager";
import { getFullContactName, getInitials } from "../../helpers/contacts";
import { withGroups } from "../../connections/allGroups";
import { withUpdate } from "../../connections/allContacts";

const ContactIdentity = ({ contact }) => (
  <div className="contact-card-identity">
    <Avatar text={getInitials(contact.name)} size="medium" />
    <div className="contact-card-identity__infos">
      <h1 className="contact-card-identity__title">
        {getFullContactName(contact.name)}
      </h1>
      <ConnectedContactGroups contact={contact} />
    </div>
  </div>
);

ContactIdentity.propTypes = {
  contact: contactPropTypes
};

class ContactGroups extends React.Component {
  render() {
    const { contactGroups, allGroups } = this.props;
    return (
      <div>
        <ContactGroupManager
          contactGroups={contactGroups}
          allGroups={allGroups}
          onGroupSelectionChange={this.props.updateContactGroups}
        />
        <ol>{contactGroups.map(group => <li>{group.name}</li>)}</ol>
      </div>
    );
  }
}

ContactGroups.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired,
  updateContactGroups: PropTypes.func.isRequired
};

class ContactGroupsWithLoading extends React.Component {
  updateContactGroups = (groups, reason) => {
    const modifiedContact = { ...this.props.contact };
    modifiedContact.groups = groups.map(group => group._id);
    this.props.updateContact(modifiedContact);
  };

  render({ data, fetchStatus, contact, updateContact }) {
    if (fetchStatus === "error") {
      return false;
    } else if (fetchStatus === "loading") {
      return <div>Loading...</div>;
    } else {
      return (
        <ContactGroups
          contactGroups={contact.groups.map(groupId =>
            data.find(group => group._id === groupId)
          )}
          allGroups={data}
          updateContactGroups={this.updateContactGroups}
        />
      );
    }
  }
}

const ConnectedContactGroups = withGroups(withUpdate(ContactGroupsWithLoading));

export default ContactIdentity;
