import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Content } from "cozy-ui/transpiled/react/Layout";
import { useI18n } from "cozy-ui/transpiled/react/I18n";
import useBreakpoints from "cozy-ui/transpiled/react/hooks/useBreakpoints";
import { ControlDefault } from "cozy-ui/transpiled/react/SelectBox";
import Input from "cozy-ui/transpiled/react/Input";
import flag from "cozy-flags";

import styled from "styled-components";

import SelectedGroupContext from "./Contexts/SelectedGroup";
import SearchContext from "./Contexts/Search";
import Header from "./Header";
import Toolbar from "./Toolbar";
import ContactsList from "./ContactsList/ContactsList.jsx";
import GroupsSelect from "./GroupsSelect/GroupsSelect";
import SearchInput from "./Search/SearchInput";
import {
  filterContactsByGroup,
  translatedDefaultSelectedGroup
} from "../helpers/groups";
import { filterContactsBySearch, delayedSetThreshold } from "../helpers/search";
import ContactListTarget from "./ContactListTarget";

const ContentComponent = styled(Content)`
  flex-direction: column !important;
  overflow: hidden !important;
  .list-wrapper {
    flex-grow: 1;
    overflow: auto;
  }
`;

const setGroupsSelectCustomStyles = isMobile => ({
  container: base => ({
    ...base,
    ...(!isMobile && { maxWidth: "24rem" })
  }),
  noOptionsMessage: base => ({ ...base, textAlign: "left" })
});

const setGroupsSelectOptions = (allGroups, defaultSelectedGroup) =>
  allGroups.length > 0 ? [defaultSelectedGroup].concat(allGroups) : allGroups;

const ControlDefaultWithTestId = ({ ...props }) => {
  return (
    <ControlDefault
      {...props}
      innerProps={{
        ...props.innerProps,
        "data-testid": "selectBox-controlDefault"
      }}
    />
  );
};

export const ContentResult = ({ contacts, allGroups }) => {
  const { t } = useI18n();
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext);
  const { searchValue } = useContext(SearchContext);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [listRef, setListRef] = useState(null);
  const { isMobile } = useBreakpoints();

  const groupsSelectCustomStyles = setGroupsSelectCustomStyles(isMobile);
  const groupsSelectOptions = setGroupsSelectOptions(
    allGroups,
    translatedDefaultSelectedGroup(t)
  );

  const handleSearchThreshold = ev => {
    const thresholdValue = parseFloat(ev.target.value);
    delayedSetThreshold(thresholdValue);
  };

  useEffect(() => {
    const filteredContactsByGroup = filterContactsByGroup(
      contacts,
      selectedGroup
    );
    const filteredContactsBySearch = filterContactsBySearch(
      filteredContactsByGroup,
      searchValue
    );
    setFilteredContacts(filteredContactsBySearch);
  }, [contacts, searchValue, selectedGroup, setFilteredContacts]);

  return (
    <>
      {contacts.length >= 1 && (
        <Header
          left={
            <>
              {flag("search-threshold") && (
                <div>
                  <Input onChange={handleSearchThreshold} defaultValue="0.3" />
                </div>
              )}
              <SearchInput />
              <GroupsSelect
                className="u-w-100 u-maw-6"
                allGroups={groupsSelectOptions}
                value={selectedGroup}
                onChange={setSelectedGroup}
                noOptionsMessage={() => t("filter.no-group")}
                styles={groupsSelectCustomStyles}
                closeMenuOnSelect={true}
                components={{
                  Control: ControlDefaultWithTestId
                }}
              />
            </>
          }
          right={<Toolbar />}
        />
      )}
      <ContentComponent>
        {searchValue === "" && (
          <ContactListTarget contacts={contacts} listRef={listRef} />
        )}
        <ContactsList contacts={filteredContacts} setListRef={setListRef} />
      </ContentComponent>
    </>
  );
};

ContentResult.propTypes = {
  contacts: PropTypes.array.isRequired,
  allGroups: PropTypes.array.isRequired
};

export default ContentResult;
