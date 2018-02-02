import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import { Modal, ModalContent } from "cozy-ui/react";
import ContactIdentity from "./ContactIdentity";
import ContactFields from "./ContactFields";
import contactPropTypes from "../ContactPropTypes";

const HeaderActions = () => null;

const supportedFieldsInOrder = [
  "phone",
  "email",
  "address",
  "cozy",
  "company",
  "birthday",
  "note"
].reverse();

const contactToFieldList = contact =>
  Object.keys(contact).map(type => ({ type, values: contact[type] }));
const filterFieldList = fields =>
  fields.filter(
    field => ["name", "_id", "_rev"].includes(field.type) === false
  );
const groupUnsupportedFields = fields => {
  const supportedFields = fields.filter(field =>
    supportedFieldsInOrder.includes(field.type)
  );
  const unsupportedFields = fields.filter(
    field => !supportedFieldsInOrder.includes(field.type)
  );

  return supportedFields.concat([
    {
      type: "other",
      values: unsupportedFields.map(unsupportedField => unsupportedField.values)
    }
  ]);
};
const orderFieldList = fields =>
  fields.sort(
    (a, b) =>
      supportedFieldsInOrder.indexOf(b.type) -
      supportedFieldsInOrder.indexOf(a.type)
  );
const makeValuesArray = fields =>
  fields.map(field => ({
    ...field,
    values: Array.isArray(field.values) ? field.values : [field.values]
  }));

const ContactCard = ({ t, onClose, contact }) => {
  const fields = contactToFieldList(contact);
  const filteredFields = filterFieldList(fields);
  const groupedFields = groupUnsupportedFields(filteredFields);
  const orderedFields = orderFieldList(groupedFields);
  const normalizedFields = makeValuesArray(orderedFields);

  return (
    <Modal into="body" dismissAction={onClose}>
      <ModalContent>
        <header>
          <ContactIdentity name={contact.name} groups={[]} />
          <HeaderActions />
        </header>
        <ContactFields fields={normalizedFields} title={t("contact_info")} />
      </ModalContent>
    </Modal>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name.isRequired,
    email: PropTypes.arrayOf(contactPropTypes.email),
    address: PropTypes.arrayOf(contactPropTypes.address),
    cozy: PropTypes.arrayOf(contactPropTypes.cozy),
    birthday: contactPropTypes.birthday,
    note: contactPropTypes.note
  }).isRequired,
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default translate()(ContactCard);
