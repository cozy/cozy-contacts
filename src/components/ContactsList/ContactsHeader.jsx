import React from "react";
import PropTypes from "prop-types";

const ContactsFilter = () => null;

const ContactsHeader = ({ renderActions }) => (
  <div className="topbar">
    <div className="topbar__left">
      <ContactsFilter />
    </div>
    <div className="topbar__right">{renderActions()}</div>
  </div>
);
ContactsHeader.propTypes = {
  renderActions: PropTypes.func.isRequired
};

export default ContactsHeader;
