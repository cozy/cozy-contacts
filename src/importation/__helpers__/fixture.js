import fs from "fs";
import { basename } from "path";
import vcard from "../vcard";

export default {
  data,
  file,
  invalidFile,
  validFile
};

function data(relpath) {
  return fs.readFileSync(file(relpath).path, { encoding: "utf-8" });
}

// Build a fake File from fixture path to be used by ../__mocks__/readFile.js
function file(relpath) {
  return {
    name: basename(relpath),
    path: `src/importation/__fixtures__/${relpath}`,
    size: 123,
    type: vcard.FILE_TYPES[0]
  };
}

function validFile() {
  return file("simple.vcf");
}

function invalidFile() {
  return {
    name: "invalid",
    path: "invalid",
    size: 123,
    type: "invalid/type"
  };
}
