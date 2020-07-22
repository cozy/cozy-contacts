import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import HasValueCondition from '../Form/HasValueCondition'
import { DumbField } from '../Form/fields'
class ContactFieldInput extends React.Component {
  state = {
    hasBeenFocused: false
  }

  onFocus = () => {
    this.setState({
      hasBeenFocused: true
    })
  }

  render() {
    const {
      id,
      name,
      type,
      label,
      placeholder,
      required,
      withLabel,
      labelPlaceholder,
      labelProps,
      isMultiline
    } = this.props
    const { hasBeenFocused } = this.state

    return (
      <div className={'contact-form__input-wrapper'}>
        <div className="contact-form__input-container">
          <Field
            id={id}
            name={name}
            type={type}
            label={label}
            labelProps={labelProps}
            isMultiline={isMultiline}
            size="medium"
            fullwidth
            placeholder={placeholder}
            required={required}
            onFocus={this.onFocus}
            onBlur={this.onMainInputBlur}
            component={DumbField}
            className="contact-form__input"
          />
        </div>
        {withLabel && (
          <HasValueCondition name={name} otherCondition={hasBeenFocused}>
            <div className="contact-form__input-container u-mt-half-s u-pl-half u-pl-0-s">
              <Field
                name={`${name}Label`}
                type="text"
                label={labelPlaceholder}
                size="medium"
                fullwidth
                component={DumbField}
                className="contact-form__input"
                onFocus={this.onFocus}
                onBlur={this.onSecondaryInputBlur}
              />
            </div>
          </HasValueCondition>
        )}
      </div>
    )
  }
}
ContactFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  withLabel: PropTypes.bool,
  labelPlaceholder: PropTypes.string,
  labelProps: PropTypes.object,
  isMultiline: PropTypes.bool,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  placeholder: '',
  labelPlaceholder: ''
}

export default ContactFieldInput
