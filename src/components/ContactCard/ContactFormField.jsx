import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import Icon from "cozy-ui/react/Icon";
import IconPlus from "../../assets/icons/small-plus.svg";
import IconCross from "../../assets/icons/small-cross.svg";

class ContactFormField extends React.Component {
  render() {
    const { name, icon, label, isArray, renderInput } = this.props;
    return (
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
                {fields.map((nameWithIndex, index) =>
                  this.renderArrayField(
                    fields,
                    index,
                    nameWithIndex,
                    name,
                    renderInput
                  )
                )}
              </div>
            )}
          </FieldArray>
        ) : (
          <div className="contact-form__inputs-wrapper">
            {renderInput(name)}
          </div>
        )}
      </div>
    );
  }

  addField = fields => fields.push(undefined);

  removeField = (fields, index) => {
    const isLastRemainignField = fields.length === 1;
    fields.remove(index);
    if (isLastRemainignField) this.addField(fields);
  };

  renderArrayField = (fields, index, nameWithIndex, name, renderInput) => {
    const isLastField = index === fields.length - 1;
    const hasValue = fields.value[index] && fields.value[index][name];
    const canAddField = isLastField && hasValue;

    return (
      <div className="contact-form__meta-wrapper" key={nameWithIndex}>
        {renderInput(`${nameWithIndex}.${name}`)}

        {hasValue && (
          <button
            type="button"
            onClick={() => this.removeField(fields, index)}
            className="contact-form__meta-button contact-form__meta-button--remove"
          >
            <Icon icon={IconCross} color="silver" />
          </button>
        )}

        {canAddField && (
          <button
            type="button"
            onClick={() => this.addField(fields)}
            className="contact-form__meta-button contact-form__meta-button--add"
          >
            <Icon icon={IconPlus} color="white" />
          </button>
        )}
      </div>
    );
  };
}
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

export default ContactFormField;
