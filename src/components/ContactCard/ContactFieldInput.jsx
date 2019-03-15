import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import classnames from 'classnames'

import HasValueCondition from '../Form/HasValueCondition'
import { AdaptedInput, AdaptedTextarea } from '../Form/fields'

const getInputComponent = inputType =>
  inputType === 'textarea' ? AdaptedTextarea : AdaptedInput

class ContactFieldInput extends React.Component {
  state = {
    hasBeenFocused: false,
    hasFocus: false
  }

  onFocus = () => {
    this.setState({
      hasBeenFocused: true,
      hasFocus: true
    })
  }

  onSecondaryInputBlur = () => {
    this.setState({
      hasFocus: false
    })
  }

  onMainInputBlur = () => {
    this.setState({
      hasFocus: false
    })
  }

  render() {
    const {
      name,
      type,
      placeholder,
      required,
      withLabel,
      labelPlaceholder
    } = this.props
    const { hasBeenFocused, hasFocus } = this.state

    return (
      <div
        className={classnames('contact-form__input-wrapper', {
          'contact-form__input-wrapper--focused': hasFocus
        })}
      >
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onMainInputBlur}
          component={getInputComponent(type)}
          className="contact-form__input"
        />
        {withLabel && (
          <HasValueCondition name={name} otherCondition={hasBeenFocused}>
            <Field
              name={`${name}Label`}
              type="text"
              component={AdaptedInput}
              className="contact-form__label-input"
              placeholder={labelPlaceholder}
              onFocus={this.onFocus}
              onBlur={this.onSecondaryInputBlur}
            />
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
