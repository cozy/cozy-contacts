// Convert contact data form v2 to v3.
// See spec.
//
// Naming convention:
// - Make function names match v3 Contact doctype as much as possible.
// - When v3 property name is ambiguous (e.g. has a singular name while
//   type is array), suffix function name with `*Array`.
// - When non-array function name inadvertently matches as v3 array property
//   (e.g. address), prefix function name with `single*`.

import _ from "lodash";
import { isBlank, trimObject } from "./utils";

export default {
  addressArray,
  birthday,
  contact,
  datapoints,
  emailArray,
  name,
  phoneArray,
  primary,
  singleAddress,
  typeArray,
  typeWithoutPref
};

function contact(v2) {
  return trimObject({
    fullname: v2.fn,
    name: name(v2),
    birthday: birthday(v2),
    note: v2.note,
    email: emailArray(v2),
    address: addressArray(v2),
    phone: phoneArray(v2),
    cozy: null, // TODO: Detect Cozy URLs in vCards?
    groups: null, // TODO: Map v2 tags to v3 groups?
    metadata: {
      version: 1
    }
  });
}

const nameAttributes = [
  "familyName",
  "givenName",
  "additionalName",
  "namePrefix",
  "nameSuffix"
];

function name({ n }) {
  if (n) return trimObject(_.zipObject(nameAttributes, n.split(";")));
}

function birthday({ bday }) {
  if (typeof bday === "string") {
    if (bday.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(bday);

    const thundersyncMatch = bday.match(/^\d{8}$/);
    if (thundersyncMatch) {
      const isoDateString = bday
        .match(/^(\d{4})(\d{2})(\d{2})$/)
        .slice(1, 4)
        .join("-");
      return new Date(isoDateString);
    }

    // TODO: throw new Error(`Invalid birthday: ${JSON.stringify(bday)}`);
  }
}

function emailArray(v2) {
  return datapoints(v2, "email");
}

function addressArray(v2) {
  return datapoints(v2, "adr");
}

function phoneArray(v2) {
  return datapoints(v2, "tel");
}

function datapoints(v2, name) {
  return _
    .chain(v2.datapoints)
    .filter({ name })
    .map(datapoint =>
      trimObject(
        _.merge(
          _datapointCommons(datapoint),
          _datapointSpecifics({ name, datapoint })
        )
      )
    )
    .value();
}

function _datapointCommons({ pref, type }) {
  return {
    label: null, // TODO: Datapoint labels
    primary: primary({ pref, type }),
    type: typeWithoutPref({ pref, type })
  };
}

function _datapointSpecifics({ name, datapoint }) {
  const { value } = datapoint;

  switch (name) {
    case "email":
      return { address: value };

    case "adr":
      return singleAddress(value);

    case "tel":
      return { number: value };
  }
}

function singleAddress(v2) {
  const [pobox, extended, street, city, region, postcode, country] = v2;

  if (_.every([pobox, extended, city, region, postcode, country], isBlank)) {
    return { formattedAddress: street };
  } else {
    return {
      pobox,
      street: isBlank(extended) ? street : `${extended}\n${street}`,
      city,
      region,
      postcode,
      country
    };
  }
}

const prefType = "pref";

function primary({ pref, type }) {
  const hasPrefType = _.includes(typeArray(type), prefType);
  if (pref === false && hasPrefType) return false;
  else if (pref || hasPrefType) return true;
}

function typeWithoutPref({ pref, type }) {
  if (pref === false) return type;
  return _
    .chain(typeArray(type))
    .without(prefType)
    .join(" ")
    .value();
}

function typeArray(type) {
  return type ? type.trim().split(/\s+/) : [];
}
