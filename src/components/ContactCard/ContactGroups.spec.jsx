import React from "react";
import { mount } from "enzyme";

import { ContactGroups } from "./ContactGroups";
import { I18n } from "cozy-ui/react/I18n";

describe("ContactGroups", () => {
  it("should display groups", () => {
    const contactMock = { groups: ["a", "b"] };
    const groupsMock = [
      { _id: "a", name: "The A Team" },
      { _id: "b", name: "The B Team" },
      { _id: "c", name: "The C Team" }
    ];
    const updateContactMock = jest.fn();

    const appInstance = (
      <I18n lang="en" dictRequire={() => ""}>
        <ContactGroups
          contact={contactMock}
          allGroups={groupsMock}
          updateContact={updateContactMock}
        />
      </I18n>
    );
    const app = mount(appInstance);

    const contactGroupTags = app.find("li.contact-groups-list__tag");

    expect(contactGroupTags.length).toEqual(2);
    expect(contactGroupTags.at(0).text()).toEqual(groupsMock[0].name);
    expect(contactGroupTags.at(1).text()).toEqual(groupsMock[1].name);
  });
});
