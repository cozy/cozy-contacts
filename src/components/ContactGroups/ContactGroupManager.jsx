import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import Select from "react-select";
import Icon from "cozy-ui/react/Icon";
import palette from "cozy-ui/stylus/settings/palette.json";

import IconGroups from "../../assets/icons/groups.svg";
import IconDown from "../../assets/icons/down.svg";

const MainButton = ({ innerProps, isFocused, children }) => (
  <div {...innerProps}>
    <Button theme="secondary" size="small">
      <Icon icon={IconGroups} color={palette["coolGrey"]} />
      Gérer les groupes
      <Icon
        icon={IconDown}
        color={palette["coolGrey"]}
        width="12"
        className="group-manager__indicator"
      />
    </Button>
    <div className="group-manager__input">{children}</div>
  </div>
);

const CustomOption = ({ label, isSelected, innerProps }) => (
  <div {...innerProps} className="group-option">
    <input
      type="checkbox"
      checked={isSelected}
      className="group-option__checkbox"
    />
    {label}
  </div>
);

const customStyles = {
  container: base => ({
    ...base,
    display: "inline-block",
    verticalAlign: "middle"
  })
};

const ContactGroupManager = ({
  contactGroups,
  allGroups,
  onGroupSelectionChange
}) => (
  <Select
    isMulti
    hideSelectedOptions={false}
    isSearchable={false}
    options={allGroups}
    defaultValue={contactGroups}
    onChange={onGroupSelectionChange}
    getOptionLabel={group => group.name}
    getOptionValue={group => group._id}
    components={{
      Option: CustomOption,
      Control: MainButton
    }}
    styles={customStyles}
  />
);

ContactGroupManager.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired,
  onGroupSelectionChange: PropTypes.func.isRequired
};

export default ContactGroupManager;
