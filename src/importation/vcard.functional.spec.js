// The following tests import a VCF file and compare the parser's output to
// a Jest snapshot (including both the v2 and the v3 output).

jest.mock("./reader");

import _ from "lodash";
import vcard from "./vcard";
import fixture from "./__helpers__/fixture";

describe("importation/vcard", () => {
  const contacts = {};
  const versions = ["v2", "v3"];

  beforeEach(() => {
    for (let version of versions) {
      contacts[version] = [];
    }
  });

  testFixture("cozy-vcard/contactA/sogo.vcf");
  testFixture("cozy-vcard/contactA/cozy.vcf");
  testFixture("cozy-vcard/contactA/sogo_fromcozysync.vcf");
  testFixture("cozy-vcard/contactA/contact.json");
  testFixture("cozy-vcard/contactA/extra-fields.vcf");
  testFixture("cozy-vcard/contactA/android.vcf");
  testFixture("cozy-vcard/contactA/ios_fromcozysync.vcf");
  testFixture("cozy-vcard/contactA/thundersync.vcf");
  testFixture("cozy-vcard/contactA/davdroid.vcf");
  testFixture("cozy-vcard/contactA/google.vcf");
  testFixture("cozy-vcard/contactA/ios.vcf");

  testFixture("cozy-vcard/android-full.vcf");
  testFixture("cozy-vcard/android-quotedprintable.vcf");
  testFixture("cozy-vcard/android.vcf");
  testFixture("cozy-vcard/apple.vcf");
  testFixture("cozy-vcard/cozy.vcf");
  testFixture("cozy-vcard/ffos.vcf");
  testFixture("cozy-vcard/google-full.vcf");
  testFixture("cozy-vcard/google.vcf");
  testFixture("cozy-vcard/ios-complex-types.vcf");
  testFixture("cozy-vcard/ios-full.vcf");
  testFixture("cozy-vcard/multiple-cards.vcf");
  testFixture("cozy-vcard/social.vcf");

  testFixture("apple-contacts-7_1.vcf");
  testFixture("empty.vcf");
  testFixture("google-contacts-2012-11-15.vcf");
  testFixture("john-doe.vcf");
  testFixture("vcard-4_0.vcf");

  // FIXME: cozy-vcard crash on missing VCARD:BEGIN
  // testFixture("broken/begin-vcard-missing.vcf");
  testFixture("broken/begin-vcard-only.vcf");
  testFixture("broken/end-vcard-duplicate.vcf");
  testFixture("broken/end-vcard-missing.vcf");
  testFixture("broken/property-bday-invalid.vcf");
  testFixture("broken/unknown-property.vcf");

  function testFixture(filename) {
    const file = fixture.file(filename);

    for (let version of versions) {
      const transform = version == "v2" ? _.identity : undefined;
      const save = async contact => contacts[version].push(contact);

      // Having a snapshot of the v2 output makes it easy to compare with the
      // v3 version.

      test(`${file.path} ${version}`, async () => {
        await vcard.importFile(file, { transform, save });
        expect(contacts[version]).toMatchSnapshot();
      });
    }
  }
});
