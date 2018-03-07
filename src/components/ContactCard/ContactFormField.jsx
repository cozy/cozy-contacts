import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import Icon from "cozy-ui/react/Icon";
import IconPlus from "../../assets/icons/plus.svg";

const getInputComponent = inputType =>
  inputType === "textarea" ? "textarea" : "input";

class ContactFieldInput extends React.Component {
  state = {
    renderLabel: false
  };

  showLabel = () => {
    this.setState({
      renderLabel: this.props.withLabel
    });
  };

  hideLabelIfEmpty = e => {
    this.setState({
      renderLabel: e.target.value && this.props.withLabel
    });
  };

  render() {
    const {
      name,
      type,
      placeholder,
      required,
      withLabel,
      labelPlaceholder
    } = this.props;
    const { renderLabel } = this.state;

    return (
      <div className="contact-form__input-wrapper">
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
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
              placeholder={labelPlaceholder}
            />
          )}
      </div>
    );
  }
}
ContactFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  withLabel: PropTypes.bool,
  required: PropTypes.bool,
  labelPlaceholder: PropTypes.string
};
ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  placeholder: "",
  labelPlaceholder: ""
};

const ContactFormField = ({
  icon,
  name,
  type,
  label,
  placeholder,
  inputWithLabel,
  required,
  isArray,
  labelPlaceholder
}) => (
  <div className="contact-form__field">
    <label className="contact-form__label">
      {icon && (
        <Icon icon={icon} color="coolGrey" className="contact-form__icon" />
      )}
      {label}
    </label>
    {isArray ? (
      <FieldArray name={name}>
        {({ fields }) => (
          <div className="contact-form__inputs-wrapper">
            {fields.map((nameWithIndex, index) => (
              <div className="contact-form__meta-wrapper" key={nameWithIndex}>
                <ContactFieldInput
                  name={`${nameWithIndex}.${name}`}
                  type={type}
                  placeholder={placeholder}
                  withLabel={inputWithLabel}
                  required={required}
                  labelPlaceholder={labelPlaceholder}
                />
                {index < fields.length - 1 && (
                  <button
                    type="button"
                    onClick={() => fields.remove(index)}
                    className="contact-form__meta-button contact-form__meta-button--remove"
                  >
                    <Icon icon={IconPlus} />
                  </button>
                )}
                {index === fields.length - 1 &&
                  fields.value[index] &&
                  fields.value[index][name] && (
                    <button
                      type="button"
                      onClick={() => fields.push(undefined)}
                      className="contact-form__meta-button contact-form__meta-button--add"
                    >
                      <Icon icon={IconPlus} />
                    </button>
                  )}
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    ) : (
      <div className="contact-form__inputs-wrapper">
        <ContactFieldInput
          name={name}
          type={type}
          placeholder={placeholder}
          withLabel={inputWithLabel}
          required={required}
          labelPlaceholder={labelPlaceholder}
        />
      </div>
    )}
  </div>
);
ContactFormField.propTypes = {
  icon: PropTypes.any, // shall be a SVG prop type
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  labelPlaceholder: PropTypes.string,
  inputWithLabel: PropTypes.bool,
  required: PropTypes.bool,
  isArray: PropTypes.bool
};
ContactFormField.defaultProps = {
  icon: null,
  inputWithLabel: false,
  required: false,
  isArray: false,
  placeholder: "",
  labelPlaceholder: ""
};

export default ContactFormField;
