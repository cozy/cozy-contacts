import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import Icon from "cozy-ui/react/Icon";
import IconPlus from "../../assets/icons/plus.svg";

const getInputComponent = inputType =>
  inputType === "textarea" ? "textarea" : "input";

export class ContactFieldInput extends React.Component {
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
  labelPlaceholder: PropTypes.string,
  required: PropTypes.bool
};
ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  placeholder: "",
  labelPlaceholder: ""
};

export const ContactFormField = ({
  name,
  icon,
  label,
  isArray,
  renderInput
}) => (
  <div className="contact-form__field">
    <label className="contact-form__label">
      {icon && (
        <Icon icon={icon} color="coolGrey" className="contact-form__icon" />
      )}
      {label}
    </label>
    {!isArray ? (
      <div className="contact-form__inputs-wrapper">{renderInput(name)}</div>
    ) : (
      <FieldArray name={name}>
        {({ fields }) => (
          <div className="contact-form__inputs-wrapper">
            {fields.map((nameWithIndex, index) => {
              const isLastField = index === fields.length - 1;
              const canAddField =
                isLastField && fields.value[index] && fields.value[index][name];

              return (
                <div className="contact-form__meta-wrapper" key={nameWithIndex}>
                  {renderInput(`${nameWithIndex}.${name}`)}

                  {!isLastField && (
                    <button
                      type="button"
                      onClick={() => fields.remove(index)}
                      className="contact-form__meta-button contact-form__meta-button--remove"
                    >
                      <Icon icon={IconPlus} />
                    </button>
                  )}

                  {canAddField && (
                    <button
                      type="button"
                      onClick={() => fields.push(undefined)}
                      className="contact-form__meta-button contact-form__meta-button--add"
                    >
                      <Icon icon={IconPlus} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </FieldArray>
    )}
  </div>
);
ContactFormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.any, // shall be a SVG prop type
  label: PropTypes.string.isRequired,
  isArray: PropTypes.bool,
  renderInput: PropTypes.func.isRequired
};
ContactFormField.defaultProps = {
  icon: null,
  isArray: false
};
