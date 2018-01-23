import React from "react";
import { PropTypes } from "prop-types";

const ContactsError = ({ error }) => <div>{error.toString()}</div>;
ContactsError.propTypes = {
  error: PropTypes.any.isRequired
};

export default ContactsError;
