import React from "react";
import { Avatar } from "cozy-ui/react";
import { fullContactPropTypes } from "../ContactPropTypes";
import ContactGroups from "./ContactGroups";
import { getFullContactName, getInitials } from "../../helpers/contacts";

const ContactIdentity = ({ contact }) => (
  <div className="contact-card-identity">
    <Avatar text={getInitials(contact.name)} size="medium" />
    <div className="contact-card-identity__infos">
      <h1 className="contact-card-identity__title">
        {getFullContactName(contact.name)}
      </h1>
      <ContactGroups contact={contact} />
    </div>
  </div>
);

ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired
};

export default ContactIdentity;
