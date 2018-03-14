import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import IconPlus from "../../assets/icons/plus.svg";

const OpenContactFormButton = ({ label, onClick }) => (
  <div>
    <Button onClick={onClick} label={label} icon={IconPlus} />
  </div>
);
OpenContactFormButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
OpenContactFormButton.defaultProps = {
  label: "Create a contact"
};

export default OpenContactFormButton;
