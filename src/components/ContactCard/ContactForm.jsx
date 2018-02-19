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

const getInputComponent = inputType =>
  inputType === "textarea" ? "textarea" : "input";

class ContactFieldInput extends React.Component {
  state = {
    renderLabel: false
  };

  showLabel = () => {
    this.setState({
      renderLabel: true
    });
  };

  hideLabelIfEmpty = e => {
    this.setState({
      renderLabel: e.target.value
    });
  };

  render() {
    const { name, type, withLabel } = this.props;
    const { renderLabel } = this.state;

    return (
      <div className="contact-form__input-wrapper">
        <Field
          name={name}
          type={type}
          onFocus={this.showLabel}
          onBlur={this.hideLabelIfEmpty}
          component={getInputComponent(type)}
          className="contact-form__input"
        />
        {withLabel &&
          renderLabel && (
            <Field
              name={`${name}Label`}
              type="text"
              component="input"
              className="contact-form__label-input"
            />
          )}
      </div>
    );
  }
}
ContactFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  withLabel: PropTypes.bool
};
ContactFieldInput.defaultProps = {
  hasLabel: false
};

const ContactFieldForm = ({ icon, name, type, label, inputWithLabel }) => (
  <div className="contact-form__field">
    <label className="contact-form__label">
      {icon && (
        <Icon icon={icon} color="coolGrey" className="contact-form__icon" />
      )}
      {label}
    </label>
    <ContactFieldInput name={name} type={type} withLabel={inputWithLabel} />
  </div>
);
ContactFieldForm.propTypes = {
  icon: PropTypes.any, // shall be a SVG prop type
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputWithLabel: PropTypes.bool
};
ContactFieldForm.defaultProps = {
  icon: null,
  hasLabel: false
};

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

    const contact = {
      fullname: data.givenName + " " + data.familyName,
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
    const { onCancel } = this.props;
    const { t } = this.context;
    return (
      <Form
        onSubmit={this.formDataToContact}
        render={({ handleSubmit }) => (
          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__fields">
                {fields.map(({ name, icon, type, hasLabel }, index) => (
                  <ContactFieldForm
                    key={index}
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
  onCancel: PropTypes.func.isRequired
};

export default ContactForm;
