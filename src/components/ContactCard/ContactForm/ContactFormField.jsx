import PropTypes from 'prop-types'
import React from 'react'
import { FieldArray } from 'react-final-form-arrays'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactFormFieldArrayItem from './ContactFormFieldArrayItem'
import { addField } from '../../../helpers/fields'

import styles from '@/styles/contactForm.styl'

const ContactFormField = ({ name, icon, isArray, renderInput }) => {
  const { t } = useI18n()

  return (
    <Media align="top" className={styles['contact-form-field']}>
      <Img>
        {icon ? (
          <Icon
            icon={icon}
            color="var(--iconTextColor)"
            className={styles['contact-form-field__icon']}
          />
        ) : (
          <div className="u-w-1 u-mr-1-half" />
        )}
      </Img>
      <Bd>
        {isArray ? (
          <FieldArray name={name}>
            {({ fields }) => (
              <div className="u-mt-1 u-mb-half">
                {fields.map((nameWithIndex, index) => {
                  const key = fields.value[index]?.fieldId || nameWithIndex

                  return (
                    <ContactFormFieldArrayItem
                      key={key}
                      fields={fields}
                      index={index}
                      nameWithIndex={nameWithIndex}
                      name={name}
                      renderInput={renderInput}
                    />
                  )
                })}
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
          <div className="u-mt-1">{renderInput(name)}</div>
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
