import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "cozy-ui/react/Avatar";
import contactPropTypes from "../ContactPropTypes";

const getFullContactName = name =>
  ["namePrefix", "givenName", "additionalName", "familyName", "nameSuffix"]
    .map(part => name[part])
    .join(" ")
    .trim();

const ContactIdentity = ({ name, groups }) => (
  <div className="contact-card-identity">
    <Avatar
      firstname={name.givenName}
      lastname={name.familyName}
      size="medium"
    />
    <div>
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
