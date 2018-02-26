import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "cozy-ui/react/Avatar";
import contactPropTypes from "../ContactPropTypes";
import { getFullContactName, getInitials } from "../../helpers/contacts";

const ContactIdentity = ({ name, groups }) => (
  <div className="contact-card-identity">
    <Avatar text={getInitials(name)} size="medium" />
    <div className="contact-card-identity__infos">
      <h1 className="contact-card-identity__title">
        {getFullContactName(name)}
      </h1>
      <ContactGroups groups={groups} />
    </div>
  </div>
);

ContactIdentity.propTypes = {
  name: contactPropTypes.name,
  groups: PropTypes.array.isRequired
};

const ContactGroups = () => null;

ContactGroups.propTypes = {
  groups: PropTypes.array.isRequired
};

export default ContactIdentity;
