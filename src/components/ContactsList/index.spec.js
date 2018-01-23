import { sortGivenNameFirst } from "./";
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
    const sortedContact = [...contacts].sort(sortGivenNameFirst);
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
    const sortedContact = [...contacts].sort(sortGivenNameFirst);
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
    const sortedContact = [...contacts].sort(sortGivenNameFirst);
    expect(sortedContact).toEqual([
      { name: { givenName: "A" } },
      { name: { givenName: "B" } },
      { name: { givenName: "" } },
      { name: { givenName: "" } }
    ]);
  });
  test("should sort contact by givenName first", () => {
    const contacts = [
      { name: { givenName: "", familyName: "" } },
      { name: { givenName: "A", familyName: "A" } },
      { name: { givenName: "B", familyName: "A" } },
      { name: { givenName: "A", familyName: "B" } },
      { name: { givenName: "B", familyName: "B" } },
      { name: { givenName: "A", familyName: "" } },
      { name: { givenName: "B", familyName: "" } },
      { name: { givenName: "A", familyName: "C" } },
      { name: { givenName: "C", familyName: "B" } },
      { name: { givenName: "B", familyName: "C" } },
      { name: { givenName: "", familyName: "B" } },
      { name: { givenName: "", familyName: "A" } }
    ];
    const sortedContact = [...contacts].sort(sortGivenNameFirst);
    expect(sortedContact).toEqual([
      { name: { givenName: "", familyName: "A" } },
      { name: { givenName: "A", familyName: "" } },
      { name: { givenName: "A", familyName: "A" } },
      { name: { givenName: "A", familyName: "B" } },
      { name: { givenName: "A", familyName: "C" } },
      { name: { givenName: "B", familyName: "" } },
      { name: { givenName: "", familyName: "B" } },
      { name: { givenName: "B", familyName: "A" } },
      { name: { givenName: "B", familyName: "B" } },
      { name: { givenName: "B", familyName: "C" } },
      { name: { givenName: "C", familyName: "B" } },
      { name: { givenName: "", familyName: "" } }
    ]);
  });
});
