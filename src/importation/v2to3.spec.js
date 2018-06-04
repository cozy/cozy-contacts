import v2to3 from "./v2to3";

describe("v2to3", () => {
  describe("contact", () => {
    it("converts a contact from v2 (bday, datapoints, fn, n, note) to v3 (adr, birthday, email, fullname, name, note, phone)", () => {
      const contactV2 = {
        fn: "John Doe",
        n: "Doe;John;;;",
        bday: "1999-02-01",
        note: "Blah",
        datapoints: [
          { name: "email", type: "home", value: "test@test.test" },
          {
            name: "adr",
            type: "home",
            value: ["", "", "43 rue blabla", "Paris", "", "750000", "France"]
          },
          { name: "tel", type: "cell work", value: "06 00 00 00 00" }
        ]
      };

      const contactV3 = v2to3.contact(contactV2);

      expect(contactV3).toMatchObject({
        fullname: "John Doe",
        name: {
          familyName: "Doe",
          givenName: "John"
        },
        birthday: new Date("1999-02-01T00:00:00.000Z"),
        note: "Blah",
        email: [{ type: "home", address: "test@test.test" }],
        address: [
          {
            street: "43 rue blabla",
            city: "Paris",
            postcode: "750000",
            country: "France",
            type: "home"
          }
        ],
        phone: [{ number: "06 00 00 00 00", type: "cell work" }]
      });
    });

    it("trims properties", () => {
      expect(
        Object.keys(
          v2to3.contact({
            fn: null,
            n: ";;;;",
            bday: "",
            note: undefined,
            datapoints: [{ name: "adr", value: [] }]
          })
        )
      ).toEqual(["metadata"]);
    });
  });

  describe("name", () => {
    it("builds the contact name from the n property", () => {
      const n = "Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.";
      expect(v2to3.name({ n })).toEqual({
        familyName: "Stevenson",
        givenName: "John",
        additionalName: "Philip,Paul",
        namePrefix: "Dr.",
        nameSuffix: "Jr.,M.D.,A.C.P."
      });
    });

    it("trims attributes", () => {
      const n = ";Pink;;Mr;";
      expect(v2to3.name({ n })).toEqual({
        givenName: "Pink",
        namePrefix: "Mr"
      });
    });

    it("is undefined when n property is empty string, null or undefined", () => {
      expect(v2to3.name({ n: "" })).toBeUndefined();
      expect(v2to3.name({ n: null })).toBeUndefined();
      expect(v2to3.name({ n: undefined })).toBeUndefined();
      expect(v2to3.name({})).toBeUndefined();
    });
  });

  describe("birthday", () => {
    it("is a Date built from v2 yyyy-mm-dd bday string", () => {
      expect(v2to3.birthday({ bday: "1990-02-03" })).toEqual(
        new Date("1990-02-03T00:00:00.000Z")
      );
    });

    it("also handles ThunderSync yyyymmdd format", () => {
      expect(v2to3.birthday({ bday: "19910405" })).toEqual(
        new Date("1991-04-05T00:00:00.000Z")
      );
    });

    it("is undefined when v2 bday string has unexpected format", () => {
      expect(v2to3.birthday({ bday: "1234" })).toBeUndefined();
    });

    it("is undefined when v2 bday is blank string, null or undefined", () => {
      expect(v2to3.birthday({ bday: "" })).toBeUndefined();
      expect(v2to3.birthday({ bday: null })).toBeUndefined();
      expect(v2to3.birthday({ bday: undefined })).toBeUndefined();
    });
  });

  describe("emailArray", () => {
    it("is an array of converted v2 email datapoints", () => {
      const contactV2 = {
        datapoints: [
          { name: "email", type: "home", value: "test@test.test" },
          { name: "other", value: "whatever" }
        ]
      };
      expect(v2to3.emailArray(contactV2)).toEqual([
        { type: "home", address: "test@test.test" }
      ]);
    });
  });

  describe("addressArray", () => {
    it("is an array of converted v2 adr datapoints", () => {
      const contactV2 = {
        datapoints: [
          {
            name: "adr",
            value: [
              "1714",
              "2nd floor",
              "455 Larkspur Dr.",
              "Baviera",
              "CA",
              "92908",
              "USA"
            ]
          },
          { name: "other", value: "whatever" }
        ]
      };
      expect(v2to3.addressArray(contactV2)).toEqual([
        {
          pobox: "1714",
          street: "2nd floor\n455 Larkspur Dr.",
          city: "Baviera",
          region: "CA",
          postcode: "92908",
          country: "USA"
        }
      ]);
    });
  });

  describe("phoneArray", () => {
    it("is an array of converted v2 tel datapoints", () => {
      const contactV2 = {
        datapoints: [
          { name: "tel", value: "0987654321" },
          { name: "other", value: "whatever" }
        ]
      };
      expect(v2to3.phoneArray(contactV2)).toEqual([{ number: "0987654321" }]);
    });
  });

  describe("datapoints", () => {
    it("is an array of converted datapoints matching the given name", () => {
      const contactV2 = {
        datapoints: [
          {
            name: "adr",
            value: [
              "",
              "",
              "455 Larkspur Dr.\nBaviera, CA 92908",
              " ",
              "",
              "",
              ""
            ]
          },
          { name: "email", type: "home", value: "test@test.test" },
          { name: "tel", pref: true, value: "0123456789" }
        ]
      };
      expect(v2to3.datapoints(contactV2, "adr")).toEqual([
        { formattedAddress: "455 Larkspur Dr.\nBaviera, CA 92908" }
      ]);
      expect(v2to3.datapoints(contactV2, "email")).toEqual([
        { address: "test@test.test", type: "home" }
      ]);
      expect(v2to3.datapoints(contactV2, "tel")).toEqual([
        { number: "0123456789", primary: true }
      ]);
    });

    it("is empty objects for unhandled ones (will be trimmed anyway)", () => {
      const contactV2 = {
        datapoints: [{ name: "unhandled", value: "whatever" }]
      };
      expect(v2to3.datapoints(contactV2, "unhandled")).toEqual([{}]);
    });

    it("is empty when v2 had no matching datapoints", () => {
      const contactV2 = {
        datapoints: [{ name: "email", value: "test@test.test" }]
      };
      expect(v2to3.datapoints(contactV2, "adr")).toEqual([]);
    });

    it("is empty when v2 had no datapoints at all", () => {
      expect(v2to3.datapoints({}, "email")).toEqual([]);
    });
  });

  describe("singleAddress", () => {
    it("maps pobox, city, region, postcode and country from v2 array to v3 object", () => {
      const pobox = "1714";
      const street = "455 Larkspur Dr.";
      const city = "Baviera";
      const region = "CA";
      const postcode = "92908";
      const country = "USA";
      expect(
        v2to3.singleAddress([
          pobox,
          "",
          street,
          city,
          region,
          postcode,
          country
        ])
      ).toEqual({ pobox, street, city, region, postcode, country });
    });

    it("prepends v2 extended field to the v3 street (since v3 does not have an extended field)", () => {
      const pobox = "1714";
      const extended = "2nd floor";
      const street = "455 Larkspur Dr.";
      const city = "Baviera";
      const region = "CA";
      const postcode = "92908";
      const country = "USA";
      expect(
        v2to3.singleAddress([
          pobox,
          extended,
          street,
          city,
          region,
          postcode,
          country
        ])
      ).toEqual({
        street: "2nd floor\n455 Larkspur Dr.",
        pobox,
        city,
        region,
        postcode,
        country
      });
    });

    it("assumes v2 street is formatted address when other v2 fields are all blank", () => {
      expect(
        v2to3.singleAddress([
          "",
          "",
          "455 Larkspur Dr.\nBaviera, CA 92908",
          " ",
          "",
          "",
          ""
        ])
      ).toEqual({
        formattedAddress: "455 Larkspur Dr.\nBaviera, CA 92908"
      });
    });

    it("assumes street otherwise", () => {
      expect(
        v2to3.singleAddress(["", "", "455 Larkspur Dr.", " ", "", "", "USA"])
      ).toEqual({
        pobox: "",
        street: "455 Larkspur Dr.",
        city: " ",
        region: "",
        postcode: "",
        country: "USA"
      });
    });

    it("has formattedAddress only set to undefined or empty string when v2 is buggy empty address (will be trimmed anyway)", () => {
      expect(v2to3.singleAddress([])).toEqual({ formattedAddress: undefined });
      expect(v2to3.singleAddress([""])).toEqual({
        formattedAddress: undefined
      });
      expect(v2to3.singleAddress(["", "", ""])).toEqual({
        formattedAddress: ""
      });
    });
  });

  describe("primary", () => {
    it("is true when v2 pref is true", () => {
      expect(v2to3.primary({ pref: true })).toBe(true);
      expect(v2to3.primary({ pref: true, type: "" })).toBe(true);
      expect(v2to3.primary({ pref: true, type: "foo" })).toBe(true);
    });

    it("is true when v2 type string includes the 'pref' word (assumes same meaning as pref=true)", () => {
      expect(v2to3.primary({ type: "foo pref bar" })).toBe(true);
    });

    it("is false when v2 had both pref=false and the 'pref' word in type string (so 'pref' can be kept, only case where false instead of null)", () => {
      expect(v2to3.primary({ pref: false, type: "foo pref bar" })).toBe(false);
    });
  });

  describe("typeWithoutPref", () => {
    it("is v2 type string with the 'pref' word removed", () => {
      expect(v2to3.typeWithoutPref({ type: "foo pref bar" })).toEqual(
        "foo bar"
      );
    });

    it("works when pref is the first word", () => {
      expect(v2to3.typeWithoutPref({ type: "pref baz" })).toEqual("baz");
    });

    it("works when pref is the last word", () => {
      expect(v2to3.typeWithoutPref({ type: "qux pref" })).toEqual("qux");
    });

    it("is same as v2 type when 'pref' is present in type string but v2 pref flag is false (so user can spot the issue)", () => {
      expect(
        v2to3.typeWithoutPref({ type: "foo pref bar", pref: false })
      ).toEqual("foo pref bar");
    });

    it("is same as v2 type when 'pref' is not present", () => {
      expect(v2to3.typeWithoutPref({ type: "foo bar" })).toEqual("foo bar");
    });

    it("is same as v2 type when given type string is empty", () => {
      expect(v2to3.typeWithoutPref({ type: "" })).toEqual("");
    });

    it("is empty string when v2 type is null or undefined (will be trimmed anyway)", () => {
      expect(v2to3.typeWithoutPref({ type: null })).toEqual("");
      expect(v2to3.typeWithoutPref({})).toEqual("");
    });
  });

  describe("typeArray", () => {
    it("splits single-space-separated v2 type string", () => {
      expect(v2to3.typeArray("foo bar")).toEqual(["foo", "bar"]);
    });

    it("is identical when v2 type string is a single word", () => {
      expect(v2to3.typeArray("foo")).toEqual(["foo"]);
    });

    it("splits buggy v2 type string by blank char sequences", () => {
      expect(v2to3.typeArray(" foo\nbar\t")).toEqual(["foo", "bar"]);
    });

    it("is empty when v2 type is empty string, null or undefined", () => {
      expect(v2to3.typeArray("")).toEqual([]);
      expect(v2to3.typeArray(null)).toEqual([]);
      expect(v2to3.typeArray(undefined)).toEqual([]);
    });

    it("is a single empty string when v2 type was buggy blank string (will be trimmed anyway)", () => {
      expect(v2to3.typeArray(" \n\t")).toEqual([""]);
    });
  });
});
