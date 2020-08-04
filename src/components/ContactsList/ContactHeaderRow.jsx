import React from "react";
import PropTypes from "prop-types";
import ContactsContext from "./ContactsContext";

const ContactHeaderRow = props => (
  <div className="divider" ref={props.refProp}>
    {props.header}
  </div>
);

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
};
export default ContactHeaderRow;
