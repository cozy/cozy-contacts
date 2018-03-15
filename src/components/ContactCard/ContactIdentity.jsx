import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "cozy-ui/react";
import contactPropTypes from "../ContactPropTypes";
import ContactGroupManager from "../ContactGroups/ContactGroupManager";
import { getFullContactName, getInitials } from "../../helpers/contacts";
import { withGroups } from "../../connections/allGroups";

const ContactIdentity = ({ name, groups }) => (
  <div className="contact-card-identity">
    <Avatar text={getInitials(name)} size="medium" />
    <div className="contact-card-identity__infos">
      <h1 className="contact-card-identity__title">
        {getFullContactName(name)}
      </h1>
      <ConnectedContactGroups contactGroups={groups} />
    </div>
  </div>
);

ContactIdentity.propTypes = {
  name: contactPropTypes.name,
  groups: PropTypes.array.isRequired
};

const ContactGroups = ({ contactGroups, allGroups }) => (
  <div>
    <ContactGroupManager contactGroups={contactGroups} allGroups={allGroups} />
    <ol>{contactGroups.map(group => <li>{group.name}</li>)}</ol>
  </div>
);

ContactGroups.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
};

const ContactGroupsWithLoading = ({ data, fetchStatus, contactGroups }) => {
  if (fetchStatus === "error") {
    return "error";
  } else if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  } else {
    return (
      <ContactGroups
        contactGroups={contactGroups.map(groupId =>
          data.find(group => group._id === groupId)
        )}
        allGroups={data}
      />
    );
  }
};

const ConnectedContactGroups = withGroups(ContactGroupsWithLoading);

export default ContactIdentity;
