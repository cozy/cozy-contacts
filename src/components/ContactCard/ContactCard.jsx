import React from "react";
import PropTypes from "prop-types";
import ContactIdentity from "./ContactIdentity";
import ContactFields from "./ContactFields";
import contactPropTypes from "../ContactPropTypes";
import {
  getFieldListFrom,
  filterFieldList,
  groupUnsupportedFields,
  supportedFieldsInOrder,
  orderFieldList,
  makeValuesArray
} from "../../helpers/contacts";

const ContactCard = ({ title, contact, renderActions }) => {
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
        {renderActions()}
      </header>
      <ContactFields fields={normalizedFields} title={title} />
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
  title: PropTypes.string.isRequired,
  renderActions: PropTypes.func
};

ContactCard.defaultProps = {
  renderActions: () => null
};

export default ContactCard;
