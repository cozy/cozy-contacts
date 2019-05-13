import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import HasValueCondition from '../Form/HasValueCondition'
import { AdaptedInput, AdaptedTextarea } from '../Form/fields'

const getInputComponent = inputType =>
  inputType === 'textarea' ? AdaptedTextarea : AdaptedInput

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
      placeholder,
      required,
      withLabel,
      labelPlaceholder
    } = this.props
    const { hasBeenFocused } = this.state

    return (
      <div className={'contact-form__input-wrapper'}>
        <div className="contact-form__input-container">
          <Field
            id={id}
            name={name}
            type={type}
            size="medium"
            fullwidth
            placeholder={placeholder}
            required={required}
            onFocus={this.onFocus}
            onBlur={this.onMainInputBlur}
            component={getInputComponent(type)}
            className="contact-form__input"
          />
        </div>
        {withLabel && (
          <HasValueCondition name={name} otherCondition={hasBeenFocused}>
            <div className="contact-form__input-container u-mt-half-s u-pl-half u-pl-0-s">
              <Field
                name={`${name}Label`}
                type="text"
                size="medium"
                fullwidth
                component={AdaptedInput}
                className="contact-form__input"
                placeholder={labelPlaceholder}
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
  placeholder: PropTypes.string,
  withLabel: PropTypes.bool,
  labelPlaceholder: PropTypes.string,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  placeholder: '',
  labelPlaceholder: ''
}

export default ContactFieldInput
