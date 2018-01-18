import { contactSort } from "./";
describe("Sort contacts", () => {
  test("should sort contact by givenName", () => {
    const contacts = [
      { name: { givenName: "B" } },
      { name: { givenName: "A" } },
      { name: { givenName: "D" } },
      { name: { givenName: "E" } },
      { name: { givenName: "C" } },
      { name: { givenName: "F" } }
    ];
    const sortedContact = [...contacts].sort(contactSort);
    expect(sortedContact).toEqual([
      { name: { givenName: "A" } },
      { name: { givenName: "B" } },
      { name: { givenName: "C" } },
      { name: { givenName: "D" } },
      { name: { givenName: "E" } },
      { name: { givenName: "F" } }
    ]);
  });
  test("should sort contact by givenName even with different cases", () => {
    const contacts = [
      { name: { givenName: "b" } },
      { name: { givenName: "A" } },
      { name: { givenName: "d" } },
      { name: { givenName: "E" } },
      { name: { givenName: "C" } },
      { name: { givenName: "f" } }
    ];
    const sortedContact = [...contacts].sort(contactSort);
    expect(sortedContact).toEqual([
      { name: { givenName: "A" } },
      { name: { givenName: "b" } },
      { name: { givenName: "C" } },
      { name: { givenName: "d" } },
      { name: { givenName: "E" } },
      { name: { givenName: "f" } }
    ]);
  });
  test("should put empty at the end", () => {
    const contacts = [
      { name: { givenName: "" } },
      { name: { givenName: "A" } },
      { name: { givenName: "B" } },
      { name: { givenName: "" } }
    ];
    const sortedContact = [...contacts].sort(contactSort);
    expect(sortedContact).toEqual([
      { name: { givenName: "A" } },
      { name: { givenName: "B" } },
      { name: { givenName: "" } },
      { name: { givenName: "" } }
    ]);
  });
});
