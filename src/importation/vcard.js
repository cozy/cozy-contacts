import VCardParser from "cozy-vcard";
import _ from "lodash";
import readFile from "./readFile";
import v2to3 from "./v2to3";

const encoding = "utf8";

const FILE_TYPES = [
  "text/vcard",
  "text/x-vcard" // Deprecated as of vCard 4.0
];

export default {
  FILE_TYPES,
  importData,
  importFile
};

const defaults = {
  parse: data => {
    const parser = new VCardParser(data);
    return parser.contacts;
  },
  transform: contact => v2to3.contact(contact),
  save: async () => {},
  onProgress: () => {}
};

async function importData(data, options) {
  // 0. Configure
  const { parse, transform, save, onProgress } = _.defaults(
    {},
    options,
    defaults
  );

  // 1. Parse
  let contacts;
  try {
    contacts = parse(data);
  } catch (parseError) {
    return { parseError };
  }

  // 2. Iterate
  const total = contacts.length;
  const skipped = [];
  let unsaved = 0;

  for (let n = 0; n < total; n++) {
    onProgress({ current: n, total });
    const contact = contacts[n];

    // 2.a. Transform
    let transformedContact;
    try {
      transformedContact = transform(contact);
    } catch (transformError) {
      skipped.push({ contact, transformError });
      continue;
    }

    // 2.b. Save
    try {
      await save(transformedContact);
    } catch (saveError) {
      unsaved++;
      skipped.push({ contact, saveError });
      continue;
    }
  }
  onProgress({ current: total, total });

  // 3. Report
  return {
    imported: total - skipped.length,
    skipped,
    total,
    unsaved
  };
}

async function importFile(file, options) {
  return new Promise((resolve, reject) => {
    readFile(file, {
      encoding,
      onError: reject,
      onLoad: async event => {
        resolve(await importData(event.target.result, options));
      }
    });
  });
}
