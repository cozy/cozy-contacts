import React from "react";
import PropTypes from "prop-types";
import { fullContactPropTypes } from "../ContactPropTypes";
import ContactGroupManager from "../ContactGroups/ContactGroupManager";
import { withGroups } from "../../connections/allGroups";
import { withUpdate } from "../../connections/allContacts";

const ContactGroups = ({ contactGroups, allGroups, updateContactGroups }) => (
  <div className="contact-card-identity__groups">
    <ContactGroupManager
      contactGroups={contactGroups}
      allGroups={allGroups}
      onGroupSelectionChange={updateContactGroups}
    />
    <ol className="contact-groups-list">
      {contactGroups.map(group => (
        <li key={group._id} className="contact-groups-list__tag">
          {group.name}
        </li>
      ))}
    </ol>
  </div>
);

ContactGroups.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired,
  updateContactGroups: PropTypes.func.isRequired
};

class ConnectedContactGroups extends React.Component {
  updateContactGroups = groups => {
    const modifiedContact = { ...this.props.contact };
    modifiedContact.groups = groups.map(group => group._id);
    this.props.updateContact(modifiedContact);
  };

  render({ data, fetchStatus, contact }) {
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

ConnectedContactGroups.propTypes = {
  data: PropTypes.array.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  contact: fullContactPropTypes.isRequired,
  updateContact: PropTypes.func.isRequired
};

export default withGroups(withUpdate(ConnectedContactGroups));
