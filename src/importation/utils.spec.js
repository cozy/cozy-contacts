import _ from "lodash";
import { isBlank, trimObject } from "./utils";

describe("vcard/utils", () => {
  describe("isBlank", () => {
    it("is true for an empty string", () => {
      expect(isBlank("")).toBe(true);
    });

    it("is true for a string including only whitespace characters", () => {
      expect(isBlank(" \t\r\n")).toBe(true);
    });

    it("is false for a non-empty string", () => {
      expect(isBlank("blah")).toBe(false);
      expect(isBlank(" b\tl\ra\nh ")).toBe(false);
    });

    it("is true for null or undefined", () => {
      expect(isBlank(null)).toBe(true);
      expect(isBlank(undefined)).toBe(true);
    });

    it("is true for an empty Array", () => {
      expect(isBlank([])).toBe(true);
    });

    it("is false for an Array containing non-blank value", () => {
      expect(isBlank(["blah"])).toBe(false);
      expect(isBlank([["blah"]])).toBe(false);
    });

    it("is true for an Array containing only blank values ", () => {
      expect(isBlank([""])).toBe(true);
      expect(isBlank([[""]])).toBe(true);
      expect(isBlank([[]])).toBe(true);
    });

    it("is true for an empty object", () => {
      expect(isBlank({})).toBe(true);
    });

    it("is false for an object with non-blank property", () => {
      expect(isBlank({ a: 1 })).toBe(false);
      expect(isBlank({ a: { b: 1 } })).toBe(false);
    });

    it("is true for an object with only blank properties", () => {
      expect(isBlank({ a: { b: "" } })).toBe(true);
    });

    it("is true for boolean false", () => {
      expect(isBlank(false)).toBe(true);
    });

    it("is false otherwise", () => {
      expect(isBlank(123)).toBe(false);
      expect(isBlank(1.23)).toBe(false);
      expect(isBlank(NaN)).toBe(false);
    });
  });

  describe("trimObject", () => {
    it("returns a copy of the given object without blank properties", () => {
      const orig = {
        a: "a",
        b: "",
        c: " \t\n",
        d: null,
        e: undefined,
        f: [
          {
            pref: false
          }
        ]
      };
      const input = _.clone(orig);
      const output = trimObject(input);

      expect(input).toEqual(orig);
      expect(output).toEqual({ a: "a" });
    });
  });
});
