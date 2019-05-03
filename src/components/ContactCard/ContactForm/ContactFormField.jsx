import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FieldArray } from 'react-final-form-arrays'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'

class ContactFormField extends React.Component {
  render() {
    const { name, icon, label, isArray, renderInput, t } = this.props
    return (
      <div className="contact-form-field">
        <Label
          block={false}
          className={classnames(
            'contact-form__label',
            'u-inline-flex',
            'u-flex-items-center',
            'u-mr-half',
            { 'u-pl-0-s u-pl-2': !icon }
          )}
        >
          {icon && (
            <Icon icon={icon} color={palette['coolGrey']} className="u-mr-1" />
          )}
          <span className="u-w-4">{label}</span>
        </Label>
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
                <Button
                  icon="plus"
                  subtle
                  type="button"
                  onClick={() => this.addField(fields)}
                  label={t(`addLabel.${name}`)}
                />
              </div>
            )}
          </FieldArray>
        ) : (
          <div className="contact-form__inputs-wrapper">
            {renderInput(name)}
          </div>
        )}
      </div>
    )
  }

  addField = fields => fields.push(undefined)

  removeField = (fields, index) => {
    const isLastRemainignField = fields.length === 1
    fields.remove(index)
    if (isLastRemainignField) this.addField(fields)
  }

  renderArrayField = (fields, index, nameWithIndex, name, renderInput) => {
    const hasValue = fields.value[index] && fields.value[index][name]
    return (
      <div key={nameWithIndex}>
        {renderInput(`${nameWithIndex}.${name}`)}

        {hasValue && (
          <Button
            type="button"
            theme="secondary"
            label="delete"
            iconOnly
            round
            icon={'cross-small'}
            onClick={() => this.removeField(fields, index)}
            className="contact-form__meta-button u-ml-1"
          />
        )}
      </div>
    )
  }
}
ContactFormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.any, // shall be a SVG prop type
  label: PropTypes.string.isRequired,
  isArray: PropTypes.bool,
  renderInput: PropTypes.func.isRequired
}
ContactFormField.defaultProps = {
  icon: null,
  isArray: false
}

export default ContactFormField
