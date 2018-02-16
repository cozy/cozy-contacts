import React from "react";
import PropTypes from "prop-types";
import { Icon, Button } from "cozy-ui/react";
import IconPlus from "../../assets/icons/plus.svg";

const OpenContactFormButton = ({ children, onClick }) => (
  <div>
    <Button onClick={onClick}>
      <Icon icon={IconPlus} />
      {children}
    </Button>
  </div>
);
OpenContactFormButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
OpenContactFormButton.defaultProps = {
  children: "Create a contact"
};

export default OpenContactFormButton;
