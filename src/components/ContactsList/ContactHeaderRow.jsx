import React from "react";
import PropTypes from "prop-types";

const ContactHeaderRow = props => (
  <div className="divider" data-letter={props.header}>
    {props.header}
  </div>
);

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
};
export default ContactHeaderRow;
