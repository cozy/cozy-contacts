import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'react-final-form-arrays'
import uniqueId from 'lodash/uniqueId'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import CrossSmall from 'cozy-ui/transpiled/react/Icons/CrossSmall'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { addField, removeField } from '../../../helpers/fields'

const ContactFormField = ({ name, icon, isArray, renderInput }) => {
  const { t } = useI18n()

  const fieldID = uniqueId('field_')

  const renderArrayField = (
    fields,
    index,
    nameWithIndex,
    name,
    renderInput
  ) => {
    const hasValue = fields.value[index] && fields.value[index][name]
    return (
      <div key={nameWithIndex} className="u-mt-1 u-flex u-pos-relative">
        {renderInput(`${nameWithIndex}.${name}`, fieldID)}

        {hasValue && (
          <IconButton
            onClick={() => removeField(fields, index)}
            className="contact-form-field__delete-icon u-top-0 u-right-0 u-mt-1"
            aria-label="delete"
            size="small"
          >
            <Icon icon={CrossSmall} />
          </IconButton>
        )}
      </div>
    )
  }

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
                  renderArrayField(
                    fields,
                    index,
                    nameWithIndex,
                    name,
                    renderInput
                  )
                )}
                <Button
                  variant="text"
                  startIcon={<Icon icon={PlusIcon} />}
                  onClick={() => addField(fields)}
                  label={t(`addLabel.${name}`)}
                />
              </div>
            )}
          </FieldArray>
        ) : (
          <div className="u-mt-1">{renderInput(name, fieldID)}</div>
        )}
      </Bd>
    </Media>
  )
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
