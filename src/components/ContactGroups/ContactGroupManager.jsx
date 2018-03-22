import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import { translate } from "cozy-ui/react/I18n";
import SelectBox, {
  reactSelectControl,
  CheckboxOption
} from "cozy-ui/react/SelectBox";
import Icon from "cozy-ui/react/Icon";
import palette from "cozy-ui/stylus/settings/palette.json";

import IconGroups from "../../assets/icons/groups.svg";
import IconDown from "../../assets/icons/down.svg";

const MainButton = ({ t }) => (
  <Button theme="secondary" size="small">
    <Icon icon={IconGroups} color={palette["coolGrey"]} />
    {t("groups.manage")}
    <Icon
      icon={IconDown}
      color={palette["coolGrey"]}
      width="12"
      className="group-manager__indicator"
    />
  </Button>
);

MainButton.propTypes = {
  t: PropTypes.func.isRequired
};

const MainButtonWithTranslation = translate()(MainButton);

const MainButtonControl = reactSelectControl(<MainButtonWithTranslation />);

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
  onGroupSelectionChange,
  t
}) => (
  <SelectBox
    isMulti
    hideSelectedOptions={false}
    isSearchable={false}
    closeMenuOnSelect={false}
    noOptionsMessage={() => t("groups.none")}
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
  onGroupSelectionChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate()(ContactGroupManager);
