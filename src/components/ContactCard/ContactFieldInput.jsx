import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import classnames from 'classnames'

const getInputComponent = inputType =>
  inputType === 'textarea' ? 'textarea' : 'input'

class ContactFieldInput extends React.Component {
  state = {
    isRenderingLabel: false,
    hasFocus: false
  }

  onFocus = () => {
    this.setState(() => ({
      isRenderingLabel: this.props.withLabel,
      hasFocus: true
    }))
  }

  onSecondaryInputBlur = () => {
    this.setState(() => ({
      hasFocus: false
    }))
  }
  /* onMainInputBlur = e => {
    this.setState(() => ({
      isRenderingLabel: e.target.value && this.props.withLabel,
      hasFocus: false
    }))
  } */

  render() {
    const {
      name,
      type,
      placeholder,
      required,
      withLabel,
      labelPlaceholder
    } = this.props
    const { isRenderingLabel, hasFocus } = this.state

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
          // onBlur={this.onMainInputBlur}
          component={getInputComponent(type)}
          className="contact-form__input"
        />
        {withLabel &&
          isRenderingLabel && (
            <Field
              name={`${name}Label`}
              type="text"
              component="input"
              className="contact-form__label-input"
              placeholder={labelPlaceholder}
              onFocus={this.onFocus}
              onBlur={this.onSecondaryInputBlur}
            />
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
