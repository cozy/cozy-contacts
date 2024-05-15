import uniqueId from 'lodash/uniqueId'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldArray } from 'react-final-form-arrays'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

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
    const showRemove = fields.length > 1

    return (
      <div key={nameWithIndex} className="u-mt-1 u-flex u-pos-relative">
        {renderInput(`${nameWithIndex}.${name}`, fieldID)}

        {showRemove && (
          <ListItemIcon className="contact-form-field__delete-icon">
            <IconButton
              aria-label="delete"
              color="error"
              size="medium"
              onClick={() => removeField(fields, index)}
            >
              <Icon icon={CrossCircleIcon} />
            </IconButton>
          </ListItemIcon>
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
            color="var(--iconTextColor)"
            className="contact-form-field__icon"
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
