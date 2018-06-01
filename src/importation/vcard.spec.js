jest.mock("./readFile");

import vcard from "./vcard";
import fixture from "./__helpers__/fixture";
import v2to3 from "./v2to3";

describe("importation/vcard", () => {
  const savedContacts = [];
  const save = async contact => savedContacts.push(contact);

  beforeEach(() => {
    savedContacts.length = 0;
  });

  describe("importFile", () => {
    it("imports a single file", async () => {
      const file = fixture.file("two-contacts.vcf");
      const report = await vcard.importFile(file, { save });
      expect(report).toMatchObject({ total: 2 });
      expect(savedContacts.length).toEqual(report.total);
    });

    it("resolves when file is empty", async () => {
      const file = fixture.file("empty.vcf");
      const report = await vcard.importFile(file, { save });
      expect(report).toEqual({
        imported: 0,
        skipped: [],
        total: 0,
        unsaved: 0
      });
      expect(savedContacts.length).toEqual(report.total);
    });
  });

  describe("importData", () => {
    it("resolves with total only when no error or skipped contacts", async () => {
      const data = fixture.data("simple.vcf");
      const report = await vcard.importData(data, { save });
      expect(report).toMatchObject({ total: 1 });
      expect(savedContacts.length).toEqual(report.total);
    });

    it("resolves with nothing but parseError if any", async () => {
      const data = fixture.data("broken/begin-vcard-missing.vcf");
      const report = await vcard.importData(data, { save });
      expect(report.parseError).toBeInstanceOf(Error);
      expect(savedContacts.length).toEqual(0);
    });

    it("resolves with contacts skipped because of transform errors", async () => {
      const data = fixture.data("two-contacts.vcf");
      const transformError = new Error("Transform error");
      const transform = contact => {
        if (contact.fn === "Contact 1") throw transformError;
        else return v2to3.contact(contact);
      };
      const report = await vcard.importData(data, { transform, save });
      expect(savedContacts.length).toEqual(1);
      expect(report).toEqual({
        total: 2,
        imported: 1,
        unsaved: 0,
        skipped: [
          {
            contact: {
              datapoints: [],
              fn: "Contact 1",
              n: ";Contact 1;;;"
            },
            transformError
          }
        ]
      });
    });

    it("resolves with contacts skipped because of save errors", async () => {
      const data = fixture.data("two-contacts.vcf");
      const saveError = new Error("Save error");
      const save = async contact => {
        if (contact.fullname === "Contact 1") throw saveError;
        else savedContacts.push(contact);
      };
      const report = await vcard.importData(data, { save });
      expect(savedContacts.length).toEqual(1);
      expect(report).toEqual({
        total: 2,
        imported: 1,
        unsaved: 1,
        skipped: [
          {
            contact: {
              datapoints: [],
              fn: "Contact 1",
              n: ";Contact 1;;;"
            },
            saveError
          }
        ]
      });
    });
  });
});
