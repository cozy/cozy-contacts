import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import Select from "react-select";
import Icon from "cozy-ui/react/Icon";
import palette from "cozy-ui/stylus/settings/palette.json";

import IconGroups from "../../assets/icons/groups.svg";

const MainButton = ({ innerProps, children }) => (
  <div {...innerProps}>
    <Button theme="secondary">
      <Icon icon={IconGroups} color={palette["coolGrey"]} />
      Gérer les groupes
    </Button>
    <div style={{ width: 0, height: 0, overflow: "hidden" }}>{children}</div>
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

const ContactGroupManager = ({
  contactGroups,
  allGroups,
  onGroupSelectionChange
}) => (
  <Select
    isMulti
    defaultValue={contactGroups}
    options={allGroups}
    onChange={onGroupSelectionChange}
    hideSelectedOptions={false}
    isSearchable={false}
    getOptionLabel={group => group.name}
    getOptionValue={group => group._id}
    components={{
      Option: CustomOption,
      Control: MainButton
    }}
  />
);

ContactGroupManager.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired,
  onGroupSelectionChange: PropTypes.func.isRequired
};

export default ContactGroupManager;
