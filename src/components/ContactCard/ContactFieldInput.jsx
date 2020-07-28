import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import HasValueCondition from '../Form/HasValueCondition'
import FieldInput from '../Form/FieldInput'

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
      required,
      withLabel,
      labelPlaceholder,
      labelProps,
      isMultiline
    } = this.props
    const { hasBeenFocused } = this.state

    return (
      <div className="u-flex u-flex-column-s u-flex-grow-1 u-pr-3">
        <Field
          id={id}
          name={name}
          type={type}
          label={label}
          labelProps={labelProps}
          isMultiline={isMultiline}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onMainInputBlur}
          component={FieldInput}
        />
        {withLabel && (
          <HasValueCondition name={name} otherCondition={hasBeenFocused}>
            <div className="u-mt-half-s u-ml-half u-ml-0-s u-flex-shrink-0 u-w-auto">
              <Field
                name={`${name}Label`}
                type="text"
                label={labelPlaceholder}
                onFocus={this.onFocus}
                onBlur={this.onSecondaryInputBlur}
                component={FieldInput}
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
  withLabel: PropTypes.bool,
  labelPlaceholder: PropTypes.string,
  labelProps: PropTypes.object,
  isMultiline: PropTypes.bool,
  required: PropTypes.bool
}

ContactFieldInput.defaultProps = {
  withLabel: false,
  required: false,
  labelPlaceholder: ''
}

export default ContactFieldInput
