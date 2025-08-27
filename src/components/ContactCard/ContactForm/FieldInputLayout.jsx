import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { fieldsRequired } from './helpers'
import FieldInput from '../FieldInput'
import FieldInputArray from '../FieldInputArray'

const FieldInputLayout = ({
  attributes: { isArray, ...attributes }, // ⚠️ isArray is here removed from attributes to avoid DOM propagration
  contacts,
  formProps
}) => {
  const { t } = useI18n()
  const { valid, submitFailed, errors } = formProps
  const { name, label, icon, ...restAttributes } = attributes

  const isError = fieldsRequired.includes(name) && !valid && submitFailed

  return (
    <div
      className={cx('u-flex u-mt-1', {
        'u-flex-items-center': !isArray,
        'u-flex-items-baseline': isArray
      })}
    >
      <div className="u-w-2-half">
        {icon && <Icon icon={icon} color="var(--iconTextColor)" />}
      </div>
      <div className="u-w-100">
        {isArray ? (
          <FieldInputArray
            attributes={attributes}
            contacts={contacts}
            formProps={formProps}
          />
        ) : (
          <FieldInput
            attributes={restAttributes}
            contacts={contacts}
            error={isError}
            helperText={isError ? errors[name] : null}
            name={name}
            label={t(`fields.${name}`)}
            labelProps={label}
          />
        )}
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
