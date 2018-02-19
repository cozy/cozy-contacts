import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import Icon from "cozy-ui/react/Icon";
import { Button } from "cozy-ui/react/Button";
import IconEmail from "../../assets/icons/email.svg";
import IconPhone from "../../assets/icons/phone-number.svg";
import IconAddress from "../../assets/icons/location.svg";
import IconCozy from "../../assets/icons/cozy.svg";
import IconCompany from "../../assets/icons/company.svg";
import IconBirthday from "../../assets/icons/calendar.svg";
import IconNotes from "../../assets/icons/comment.svg";

const fields = [
  {
    labelKey: "firstname",
    icon: null,
    type: "text"
  },
  {
    labelKey: "lastname",
    icon: null,
    type: "text"
  },
  {
    labelKey: "phone",
    icon: IconPhone,
    type: "text"
  },
  {
    labelKey: "email",
    icon: IconEmail,
    type: "text"
  },
  { labelKey: "address", icon: IconAddress, type: "text" },
  { labelKey: "cozy", icon: IconCozy, type: "text" },
  { labelKey: "company", icon: IconCompany, type: "text" },
  { labelKey: "birthday", icon: IconBirthday, type: "text" },
  { labelKey: "notes", icon: IconNotes, type: "text" }
];

const ContactFieldForm = ({ icon, label, type, input, meta }) => (
  <div style={{ display: "flex" }}>
    <div style={{ flex: "1" }}>
      {icon && <Icon icon={icon} color="silver" />}
      <label>{label}</label>
    </div>
    <input type={type} {...input} placeholder={label} />
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </div>
);
ContactFieldForm.propTypes = {
  icon: PropTypes.any, // shall be a SVG prop type
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text"]).isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};
ContactFieldForm.defaultProps = {
  icon: null
};

const ContactForm = ({ onSubmit, onCancel }, { t }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <div>
        <form onSubmit={handleSubmit}>
          {fields.map(({ labelKey, icon, type }) => (
            <Field
              name={labelKey}
              key={labelKey}
              render={({ input, meta }) => (
                <ContactFieldForm
                  input={input}
                  meta={meta}
                  icon={icon}
                  label={t(`field.${labelKey}`)}
                  type={type}
                />
              )}
            />
          ))}
          <div className="modal__footer">
            <div style={{ flex: 1 }}>Plus de champ</div>
            <div>
              <Button theme="secondary" onClick={onCancel}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </div>
        </form>
      </div>
    )}
  />
);
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ContactForm;
