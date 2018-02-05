import {
  supportedFieldsInOrder,
  getFieldListFrom,
  filterFieldList,
  groupUnsupportedFields,
  orderFieldList,
  makeValuesArray
} from "./ContactCard.jsx";

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

describe("Transform contacts", () => {
  it("should transform an object into an array of fields", () => {
    const contact = {
      a: 1,
      b: 2,
      c: 3
    };
    const transformed = getFieldListFrom(contact);

    expect(transformed).toBeInstanceOf(Array);
    expect(transformed.length).toEqual(3);
    expect(transformed[0].type).toEqual("a");
    expect(transformed[0].values).toEqual(1);
    expect(transformed[1].type).toEqual("b");
    expect(transformed[1].values).toEqual(2);
    expect(transformed[2].type).toEqual("c");
    expect(transformed[2].values).toEqual(3);
  });
});

describe("Filter fields", () => {
  const fields = [
    { type: "_id", values: "aaa" },
    { type: "_rev", values: "bbb" },
    { type: "name", values: "Claude Douillet" },
    { type: "stays", values: "Hi!" }
  ];

  it("should filter out CouchDB fields", () => {
    const filtered = filterFieldList(fields);

    expect(filtered).toBeInstanceOf(Array);
    expect(
      filtered.filter(field => ["_id", "_rev"].includes(field.type)).length
    ).toEqual(0);
    expect(
      filtered.filter(field => ["stays"].includes(field.type)).length
    ).toEqual(1);
  });

  it("should filter out the name field", () => {
    const filtered = filterFieldList(fields);

    expect(filtered).toBeInstanceOf(Array);
    expect(
      filtered.filter(field => ["name"].includes(field.type)).length
    ).toEqual(0);
    expect(
      filtered.filter(field => ["stays"].includes(field.type)).length
    ).toEqual(1);
  });
});

describe("Group fields", () => {
  const fields = [
    { type: "phone", values: "whatever" },
    { type: "email", values: "whatever" },
    { type: "address", values: "whatever" },
    { type: "cozy", values: "whatever" },
    { type: "company", values: "whatever" },
    { type: "birthday", values: "whatever" },
    { type: "note", values: "whatever" },
    { type: "unsupported", values: "whatever" },
    { type: "unsupported phone", values: "whatever" }
  ];

  it("should group unsupported fields together", () => {
    const grouped = groupUnsupportedFields(fields);
    const others = grouped.filter(field => field.type === "other");

    expect(grouped).toBeInstanceOf(Array);
    expect(
      grouped.filter(field =>
        ["unsupported", "unsupported phone"].includes(field.type)
      ).length
    ).toEqual(0);
    expect(others.length).toEqual(1);
    expect(others[0].values.length).toEqual(2);
    expect(others[0].values[0]).toEqual(fields[7].values);
    expect(others[0].values[1]).toEqual(fields[8].values);
  });

  it("should leave supported fields alone", () => {
    const grouped = groupUnsupportedFields(fields);

    expect(
      grouped.filter(field => supportedFieldsInOrder.includes(field.type))
        .length
    ).toEqual(7);
  });

  it('should group an unsupported field called "other"', () => {
    const grouped = groupUnsupportedFields([
      { type: "other", values: "whatever" },
      { type: "unsupported", values: "whatever" },
      { type: "phone", values: "whatever" }
    ]);
    const others = grouped.filter(field => field.type === "other");

    expect(others.length).toEqual(1);
    expect(others[0].values.length).toEqual(2);
    expect(others[0].values[0]).toEqual(fields[0].values);
    expect(others[0].values[1]).toEqual(fields[1].values);
  });
});

describe("Order fields", () => {
  it("should order fields", () => {
    const fields = [
      { type: "phone", values: "whatever" },
      { type: "email", values: "whatever" },
      { type: "address", values: "whatever" },
      { type: "cozy", values: "whatever" },
      { type: "company", values: "whatever" },
      { type: "birthday", values: "whatever" },
      { type: "note", values: "whatever" },
      { type: "other", values: "whatever" }
    ];
    const shuffled = shuffleArray(fields);
    const sorted = orderFieldList(shuffled);

    expect(sorted).toBeInstanceOf(Array);
    expect(sorted.length).toEqual(fields.length);

    for (let i = 0; i < sorted.length; ++i) {
      expect(sorted[i]).toEqual(fields[i]);
    }
  });

  it("should be ok with missing fields", () => {
    const fields = [
      { type: "phone", values: "whatever" },
      { type: "address", values: "whatever" },
      { type: "cozy", values: "whatever" },
      { type: "company", values: "whatever" },
      { type: "note", values: "whatever" },
      { type: "other", values: "whatever" }
    ];
    const shuffled = shuffleArray(fields);
    const sorted = orderFieldList(shuffled);

    expect(sorted).toBeInstanceOf(Array);
    expect(sorted.length).toEqual(fields.length);

    for (let i = 0; i < sorted.length; ++i) {
      expect(sorted[i]).toEqual(fields[i]);
    }
  });
});

describe("Normalize values", () => {
  it("should transform non-array values into arrays", () => {
    const fields = [
      { type: "phone", values: "whatever" },
      { type: "address", values: 42 },
      { type: "cozy", values: {} },
      { type: "company", values: null },
      { type: "note" },
      { type: "other", values: false }
    ];
    const normalized = makeValuesArray(fields);

    normalized.forEach((field, index) => {
      expect(field.values).toBeInstanceOf(Array);
      expect(field.values[0]).toEqual(fields[index].values);
    });
  });

  it("should preserve values that are already arrays", () => {
    const fields = [{ type: "phone", values: [1, 2] }];
    const normalized = makeValuesArray(fields);

    expect(normalized[0].values).toEqual(fields[0].values);
  });
});
