import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'react-final-form-arrays'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import uniqueId from 'lodash/uniqueId'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

class ContactFormField extends React.Component {
  constructor(props) {
    super(props)
    this.fieldID = uniqueId('field_')
  }

  render() {
    const { name, icon, isArray, renderInput, t } = this.props
    return (
      <Media align="top" className="contact-form-field">
        <Img>
          {icon ? (
            <Icon
              icon={icon}
              color={palette['coolGrey']}
              className="contact-form-field__icon u-mr-2"
            />
          ) : (
            <div className="u-w-1 u-mr-2" />
          )}
        </Img>
        <Bd>
          {isArray ? (
            <FieldArray name={name}>
              {({ fields }) => (
                <div className="u-mt-1 u-mb-half">
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
                    theme="text"
                    type="button"
                    onClick={() => this.addField(fields)}
                    label={t(`addLabel.${name}`)}
                    className="u-ph-0 u-mh-0"
                  />
                </div>
              )}
            </FieldArray>
          ) : (
            <div className="u-mt-1">{renderInput(name, this.fieldID)}</div>
          )}
        </Bd>
      </Media>
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
      <div key={nameWithIndex} className="u-mt-1 u-flex u-pos-relative">
        {renderInput(`${nameWithIndex}.${name}`, this.fieldID)}

        {hasValue && (
          <Button
            type="button"
            theme="secondary"
            label="delete"
            iconOnly
            round
            icon={'cross-small'}
            onClick={() => this.removeField(fields, index)}
            className="u-pos-absolute u-top-0 u-right-0 u-mt-1"
          />
        )}
      </div>
    )
  }
}
ContactFormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.any, // shall be a SVG prop type
  isArray: PropTypes.bool,
  renderInput: PropTypes.func.isRequired
}
ContactFormField.defaultProps = {
  icon: null,
  isArray: false
}

export default ContactFormField
