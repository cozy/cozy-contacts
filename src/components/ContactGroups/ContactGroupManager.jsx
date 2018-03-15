import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";
import SelectableGroupList from "./SelectableGroupList";

const GroupCreationForm = () => null;

class ContactGroupManager extends React.Component {
  state = {
    deployed: true
  };

  toggleContactGroup = group => {
    console.log("toggle group", group);
  };

  render() {
    const { contactGroups, allGroups } = this.props;

    return (
      <div>
        <Button theme="secondary" label="Gérer les groupes" />
        <div>
          <SelectableGroupList
            groups={allGroups}
            selected={contactGroups}
            onToggleGroup={this.toggleContactGroup}
          />
          <hr />
          <GroupCreationForm />
        </div>
      </div>
    );
  }
}

ContactGroupManager.propTypes = {
  contactGroups: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
};

export default ContactGroupManager;
