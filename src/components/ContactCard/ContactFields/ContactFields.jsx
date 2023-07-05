import PropTypes from 'prop-types'
import React from 'react'

import ContactField from './ContactField'
import Fieldset from '../../Common/Fieldset'
import FieldsetTitle from '../../Common/FieldsetTitle'

const ContactFields = ({ fields, title }) => (
  <div>
    {title && <FieldsetTitle title={title} />}
    <Fieldset>
      {fields
        .filter(field => field.values.length > 0)
        .map((field, index) => (
          <li key={index}>
            <ContactField type={field.type} values={field.values} />
          </li>
        ))}
    </Fieldset>
  </div>
)

ContactFields.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      values: PropTypes.array.isRequired
    })
  ),
  title: PropTypes.string
}

export default ContactFields
