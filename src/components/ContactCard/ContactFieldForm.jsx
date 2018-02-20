import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import Icon from "cozy-ui/react/Icon";

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
  withLabel: false
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
  inputWithLabel: false
};

export default ContactFieldForm;
