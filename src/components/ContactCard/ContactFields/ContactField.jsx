import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'

import FieldWrapper from './FieldWrapper'

const iconsByType = {
  birthday: 'calendar',
  note: 'comment',
  company: 'company',
  jobTitle: 'people',
  cozy: 'cloud',
  email: 'email',
  address: 'location',
  phone: 'telephone'
}

const getIcon = fieldType => iconsByType[fieldType] || 'flag'

const ContactField = ({ type, values }) => (
  <div className="u-flex u-mt-half">
    <div className="u-mr-1 u-fz-large">
      <Icon icon={getIcon(type)} color="var(--iconTextColor)" />
    </div>
    <div>
      {values.map((value, index) => (
        <FieldWrapper type={type} value={value} key={index} />
      ))}
    </div>
  </div>
)

ContactField.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}

export default ContactField
