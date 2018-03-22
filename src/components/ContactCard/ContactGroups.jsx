import React from "react";
import PropTypes from "prop-types";
import { fullContactPropTypes } from "../ContactPropTypes";
import { withGroups } from "../../connections/allGroups";
import { withUpdate } from "../../connections/allContacts";

export class ContactGroups extends React.Component {
  updateContactGroups = groups => {
    const modifiedContact = { ...this.props.contact };
    modifiedContact.groups = groups.map(group => group._id);
    this.props.updateContact(modifiedContact);
  };

  render() {
    const { allGroups, contact } = this.props;
    const contactGroups = contact.groups || [];
    const fullGroups = contactGroups
      .map(groupId => allGroups.find(group => group._id === groupId))
      .filter(value => value);

    return (
      <div className="contact-card-identity__groups">
        <ol className="contact-groups-list">
          {fullGroups.map(group => (
            <li key={group._id} className="contact-groups-list__tag">
              {group.name}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

ContactGroups.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  updateContact: PropTypes.func.isRequired
};

const ConnectedContactGroups = ({
  data,
  fetchStatus,
  contact,
  updateContact
}) => {
  if (fetchStatus === "error") {
    return false;
  } else if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  } else {
    return (
      <ContactGroups
        contact={contact}
        allGroups={data}
        updateContact={updateContact}
      />
    );
  }
};

ConnectedContactGroups.propTypes = {
  data: PropTypes.array.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  contact: fullContactPropTypes.isRequired,
  updateContact: PropTypes.func.isRequired
};

export default withGroups(withUpdate(ConnectedContactGroups));
