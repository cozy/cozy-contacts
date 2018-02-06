import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import ContactIdentity from "./ContactIdentity";
import ContactFields from "./ContactFields";
import contactPropTypes from "../ContactPropTypes";

const HeaderActions = () => null;

export const supportedFieldsInOrder = [
  "phone",
  "email",
  "address",
  "cozy",
  "company",
  "birthday",
  "note"
];

export const getFieldListFrom = contact =>
  Object.keys(contact).map(type => ({ type, values: contact[type] }));
export const filterFieldList = fields =>
  fields.filter(
    field => ["name", "_id", "_rev"].includes(field.type) === false
  );
export const groupUnsupportedFields = (fields, supportedFieldTypes) => {
  const supportedFields = fields.filter(field =>
    supportedFieldTypes.includes(field.type)
  );
  const unsupportedFields = fields.filter(
    field => !supportedFieldTypes.includes(field.type)
  );

  return supportedFields.concat([
    {
      type: "other",
      values: unsupportedFields.map(unsupportedField => unsupportedField.values)
    }
  ]);
};
export const orderFieldList = (fields, fieldsInOrder) =>
  fields.sort(
    (a, b) => fieldsInOrder.indexOf(a.type) - fieldsInOrder.indexOf(b.type)
  );
export const makeValuesArray = fields =>
  fields.map(field => ({
    ...field,
    values: Array.isArray(field.values) ? field.values : [field.values]
  }));

const ContactCard = ({ t, contact }) => {
  const fields = getFieldListFrom(contact);
  const filteredFields = filterFieldList(fields);
  const groupedFields = groupUnsupportedFields(
    filteredFields,
    supportedFieldsInOrder
  );
  const orderedFields = orderFieldList(groupedFields, supportedFieldsInOrder);
  const normalizedFields = makeValuesArray(orderedFields);

  return (
    <div>
      <header>
        <ContactIdentity name={contact.name} groups={[]} />
        <HeaderActions />
      </header>
      <ContactFields fields={normalizedFields} title={t("contact_info")} />
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    email: PropTypes.arrayOf(contactPropTypes.email),
    address: PropTypes.arrayOf(contactPropTypes.address),
    cozy: PropTypes.arrayOf(contactPropTypes.cozy),
    birthday: contactPropTypes.birthday,
    note: contactPropTypes.note
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate()(ContactCard);
