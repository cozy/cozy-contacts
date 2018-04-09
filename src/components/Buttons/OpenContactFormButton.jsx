import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import IconPlus from "../../assets/icons/plus.svg";

const OpenContactFormButton = ({ label, onClick, disabled }) => (
  <div>
    <Button
      onClick={onClick}
      label={label}
      disabled={disabled}
      icon={IconPlus}
    />
  </div>
);
OpenContactFormButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.func
};
OpenContactFormButton.defaultProps = {
  label: "Create a contact",
  disabled: false
};

export default OpenContactFormButton;
