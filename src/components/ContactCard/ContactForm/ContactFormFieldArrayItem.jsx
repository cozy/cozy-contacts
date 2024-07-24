import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'

import { removeField } from '../../../helpers/fields'

const ContactFormFieldArrayItem = ({
  fields,
  index,
  nameWithIndex,
  name,
  renderInput
}) => {
  const showRemove = fields.value[index]?.[name]

  return (
    <div className="u-mt-1 u-flex u-pos-relative">
      {renderInput(`${nameWithIndex}.${name}`)}

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

export default ContactFormFieldArrayItem
