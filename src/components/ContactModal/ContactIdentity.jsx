import React from "react";
import PropTypes from "prop-types";
import ContactBadge from "../ContactBadge";
import contactPropTypes from "../ContactPropTypes";

const ContactIdentity = ({ name, groups }) => (
  <div className="contact-identity">
    <ContactBadge firstname={name.givenName} lastname={name.familyName} />
    <div>
      <h1 className="contact-identity__title">
        {`${name.namePrefix || ""} ${name.givenName ||
          ""} ${name.additionalName || ""} ${name.familyName ||
          ""} ${name.nameSuffix || ""}`.trim()}
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
