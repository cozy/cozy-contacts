import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { FieldArray } from 'react-final-form-arrays'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { fieldsRequired } from './helpers'
import { addField, removeField } from '../../../helpers/fields'
import FieldInput from '../FieldInput'

const FieldInputLayout = ({
  attributes: { name, label, icon, isArray, ...restAttributes },
  contacts,
  formProps: { valid, submitFailed, errors }
}) => {
  const { t } = useI18n()

  if (isArray) {
    return (
      <div className="u-flex u-mt-1 u-flex-items-baseline">
        <div className="u-w-2-half">
          {icon && <Icon icon={icon} color="var(--iconTextColor)" />}
        </div>
        <div className="u-w-100">
          <FieldArray name={name}>
            {({ fields }) => {
              return (
                <>
                  {fields.map((nameWithIndex, index) => {
                    const key = fields.value[index]?.fieldId || nameWithIndex
                    const showRemove = fields.value[index]?.[name]
                    const inputName = `${nameWithIndex}.${name}`
                    const isError =
                      fieldsRequired.includes(inputName) &&
                      !valid &&
                      submitFailed

                    return (
                      <div
                        key={key}
                        className={cx('u-flex u-flex-items-center', {
                          'u-mt-1': index !== 0
                        })}
                      >
                        <FieldInput
                          attributes={restAttributes}
                          contacts={contacts}
                          error={isError}
                          helperText={isError ? errors[inputName] : null}
                          name={inputName}
                          label={t(`fields.${name}`)}
                          labelProps={label}
                        />
                        {showRemove && (
                          <ListItemIcon className="u-ml-half">
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
                  })}
                  <Button
                    variant="text"
                    startIcon={<Icon icon={PlusIcon} />}
                    onClick={() => addField(fields)}
                    label={t(`addLabel.${name}`)}
                  />
                </>
              )
            }}
          </FieldArray>
        </div>
      </div>
    )
  }

  const isError = fieldsRequired.includes(name) && !valid && submitFailed

  return (
    <div className="u-flex u-flex-items-center u-mt-1">
      <div className="u-w-2-half">
        {icon && <Icon icon={icon} color="var(--iconTextColor)" />}
      </div>
      <div className="u-w-100">
        <FieldInput
          attributes={restAttributes}
          contacts={contacts}
          error={isError}
          helperText={isError ? errors[name] : null}
          name={name}
          label={t(`fields.${name}`)}
          labelProps={label}
        />
      </div>
    </div>
  )
}

FieldInputLayout.propTypes = {
  attributes: PropTypes.object,
  contacts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }),
  formProps: PropTypes.object
}

export default FieldInputLayout
