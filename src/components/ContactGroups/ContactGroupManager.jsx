import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import Select, {
  reactSelectControl,
  CheckboxOption
} from "cozy-ui/react/select";
import Icon from "cozy-ui/react/Icon";
import palette from "cozy-ui/stylus/settings/palette.json";

import IconGroups from "../../assets/icons/groups.svg";
import IconDown from "../../assets/icons/down.svg";

const MainButton = (
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
);

const MainButtonControl = reactSelectControl(MainButton);

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
      Option: CheckboxOption,
      Control: MainButtonControl
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
