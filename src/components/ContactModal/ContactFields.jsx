import React from "react";
import PropTypes from "prop-types";
import { Icon } from "cozy-ui/react";
import palette from "cozy-ui/stylus/settings/palette.json";
import { translate } from "cozy-ui/react/I18n";

import IconCalendar from "../../assets/icons/calendar.svg";
import IconComment from "../../assets/icons/comment.svg";
import IconCompany from "../../assets/icons/company.svg";
import IconCozy from "../../assets/icons/cozy.svg";
import IconEmail from "../../assets/icons/email.svg";
import IconFlag from "../../assets/icons/flag.svg";
import IconLocation from "../../assets/icons/location.svg";
import IconPhone from "../../assets/icons/phone-number.svg";

const getIcon = fieldType => {
  switch (fieldType) {
    case "birthday":
      return IconCalendar;
    case "note":
      return IconComment;
    case "company":
      return IconCompany;
    case "cozy":
      return IconCozy;
    case "email":
      return IconEmail;
    case "address":
      return IconLocation;
    case "phone":
      return IconPhone;
    default:
      return IconFlag;
  }
};

const emptyAddress = {
  street: "",
  pobox: "",
  city: "",
  region: "",
  postcode: "",
  country: ""
};

const renderFieldValue = (value, type, t) => {
  if (!value) return false;
  if (type === "birthday") return new Date(value).toLocaleDateString();
  if (typeof value !== "object") return value.toString();

  switch (type) {
    case "address":
      return t("formatted_address", { ...emptyAddress, ...value }).trim();
    case "email":
      return <a href={`mailto:${value.address}`}>{value.address}</a>;
    case "phone":
      return <a href={`tel:${value.number}`}>{value.number}</a>;
    case "cozy":
      return value.url;
    default:
      return Object.keys(value)
        .map(label => `${label}: ${value[label]}`)
        .join(", ");
  }
};

const ContactFields = ({ fields, title }) => (
  <div>
    {title && <h3 className="contact-fields-title">{title}</h3>}
    <ol className="contact-field-list">
      {fields.map((field, index) => (
        <ContactField type={field.type} values={field.values} key={index} />
      ))}
    </ol>
  </div>
);

ContactFields.propTypes = {
  fields: PropTypes.array.isRequired,
  title: PropTypes.string
};

const ContactField = ({ type, values }) => (
  <li className="contact-field">
    <div className="contact-field-icon">
      <Icon icon={getIcon(type)} color={palette["coolGrey"]} />
    </div>
    <div>
      {values.map((value, index) => (
        <FieldValueWithI18n type={type} value={value} key={index} />
      ))}
    </div>
  </li>
);

ContactField.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
};

const FieldValue = ({ t, type, value }) => {
  const renderedValue = renderFieldValue(value, type, t);
  const label = value.type || value.label || null;

  return (
    <div className="contact-field-value">
      {renderedValue}
      {label && <span className="contact-field-separator">·</span>}
      {label && <span className="contact-field-label">{label}</span>}
    </div>
  );
};

FieldValue.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  t: PropTypes.func.isRequired
};

const FieldValueWithI18n = translate()(FieldValue);

export default ContactFields;
