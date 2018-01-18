import React from "react";
import { mount } from "enzyme";

import ContactRow from "./ContactRow";

describe("ContactRow", () => {
  test("should accept the strict minimum", () => {
    const contact = { email: [{ address: "johndoe@localhost" }] };
    const contactRowInstance = <ContactRow contact={contact} />;
    const contactrow = mount(contactRowInstance);
    const contactrowemail = contactrow.find("ContactEmail");
    expect(contactrowemail).toBeDefined();
    expect(contactrowemail.text()).toBe(contact.email[0].address);
  });
  test("should display data", () => {
    const contact = {
      name: { familyName: "Doe", givenName: "John" },
      phone: [{ number: "0123456789" }],
      email: [{ address: "johndoe@localhost" }]
    };
    const contactRowInstance = <ContactRow contact={contact} />;
    const contactrow = mount(contactRowInstance);
    const contactrowname = contactrow.find("ContactName");
    expect(contactrowname).toBeDefined();
    expect(contactrowname.text()).toEqual(
      expect.stringContaining(contact.name.givenName)
    );
    expect(contactrowname.text()).toEqual(
      expect.stringContaining(contact.name.familyName)
    );
    const contactrowphone = contactrow.find("ContactPhone");
    expect(contactrowphone).toBeDefined();
    expect(contactrowphone.text()).toBe(contact.phone[0].number);
  });
  test("should display empty string for missing information", () => {
    const contact = { email: [{ address: "johndoe@localhost" }] };
    const contactRowInstance = <ContactRow contact={contact} />;
    const contactrow = mount(contactRowInstance);
    const contactrowname = contactrow.find("ContactName");
    expect(contactrowname).toBeDefined();
    expect(contactrowname.text().trim()).toBe("(unknown)");
    const contactrowphone = contactrow.find("ContactPhone");
    expect(contactrowphone).toBeDefined();
    expect(contactrowphone.text().trim()).toBe("—");
  });
});
