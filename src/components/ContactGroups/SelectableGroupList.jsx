import React from "react";
import PropTypes from "prop-types";

const SelectableGroupList = ({ groups, selected, onToggleGroup }) => (
  <ol>
    {groups.map(group => (
      <li>
        <label onClick={() => onToggleGroup(group)}>
          <input type="checkbox" checked={selected.indexOf(group) >= 0} />
          {group.name}
        </label>
      </li>
    ))}
  </ol>
);

export default SelectableGroupList;
