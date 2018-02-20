import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import ContactFieldForm from "./ContactFieldForm";
import { Button } from "cozy-ui/react/Button";
import { translate } from "cozy-ui/react/I18n";

import IconEmail from "../../assets/icons/email.svg";
import IconPhone from "../../assets/icons/phone-number.svg";
import IconAddress from "../../assets/icons/location.svg";
import IconCozy from "../../assets/icons/cozy.svg";
import IconCompany from "../../assets/icons/company.svg";
import IconBirthday from "../../assets/icons/calendar.svg";
import IconNote from "../../assets/icons/comment.svg";

const fields = [
  {
    name: "givenName",
    icon: null,
    type: "text"
  },
  {
    name: "familyName",
    icon: null,
    type: "text"
  },
  {
    name: "phone",
    icon: IconPhone,
    type: "tel",
    hasLabel: true
  },
  {
    name: "email",
    icon: IconEmail,
    type: "email",
    hasLabel: true
  },
  {
    name: "address",
    icon: IconAddress,
    type: "text",
    hasLabel: true
  },
  {
    name: "cozy",
    icon: IconCozy,
    type: "url",
    hasLabel: true
  },
  {
    name: "company",
    icon: IconCompany,
    type: "text"
  },
  {
    name: "birthday",
    icon: IconBirthday,
    type: "date"
  },
  {
    name: "note",
    icon: IconNote,
    type: "textarea"
  }
];

class ContactForm extends React.Component {
  formDataToContact = data => {
    const {
      givenName,
      familyName,
      phone,
      email,
      address,
      cozy,
      company,
      birthday,
      note
    } = data;

    const fullName = (givenName || "") + " " + (familyName || "");

    const contact = {
      fullname: fullName.trim(),
      name: {
        givenName,
        familyName
      },
      email: email
        ? [
            {
              address: email,
              type: data["emailLabel"],
              primary: true
            }
          ]
        : undefined,
      address: address
        ? [
            {
              formattedAddress: address,
              type: data["addressLabel"],
              primary: true
            }
          ]
        : undefined,
      phone: phone
        ? [
            {
              number: phone,
              type: data["phoneLabel"],
              primary: true
            }
          ]
        : undefined,
      cozy: cozy
        ? [
            {
              url: cozy,
              label: data["cozyLabel"],
              primary: true
            }
          ]
        : undefined,
      company,
      birthday,
      note
    };

    this.props.onSubmit(contact);
  };

  render() {
    const { onCancel, t } = this.props;
    return (
      <Form
        onSubmit={this.formDataToContact}
        render={({ handleSubmit }) => (
          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__fields">
                {fields.map(({ name, icon, type, hasLabel }) => (
                  <ContactFieldForm
                    key={name}
                    icon={icon}
                    name={name}
                    label={t(`field.${name}`)}
                    type={type}
                    inputWithLabel={hasLabel}
                  />
                ))}
              </div>

              <div className="contact-form__footer">
                <div>
                  <Button theme="secondary" onClick={onCancel}>
                    {t("cancel")}
                  </Button>
                  <Button type="submit">{t("save")}</Button>
                </div>
              </div>
            </form>
          </div>
        )}
      />
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate()(ContactForm);
