import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import IconBirthday from '../../assets/icons/calendar.svg'
import IconNote from '../../assets/icons/comment.svg'
import IconCompany from '../../assets/icons/company.svg'
import IconCozy from '../../assets/icons/cozy.svg'
import IconEmail from '../../assets/icons/email.svg'
import IconFlag from '../../assets/icons/flag.svg'
import IconAddress from '../../assets/icons/location.svg'
import IconPhone from '../../assets/icons/phone-number.svg'

const ContactFields = ({ fields, title }) => (
  <div>
    {title && <h3 className="contact-fields-title">{title}</h3>}
    <ol className="contact-field-list">
      {fields.filter(field => field.values.length > 0).map((field, index) => (
        <li key={index}>
          <ContactField type={field.type} values={field.values} />
        </li>
      ))}
    </ol>
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

const ContactField = ({ type, values }) => (
  <div className="contact-field">
    <div className="contact-field-icon">
      <Icon icon={getIcon(type)} color={palette['coolGrey']} />
    </div>
    <div>
      {values.map((value, index) => (
        <FieldValueWithI18n type={type} value={value} key={index} />
      ))}
    </div>
  </div>
)

ContactField.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}

const FieldValue = ({ type, value, t, f }) => {
  const renderedValue = renderFieldValue(value, type, t, f)
  const label = value.type || value.label || null

  return (
    <div className="contact-field-value">
      {renderedValue}
      {label && <span className="contact-field-separator">·</span>}
      {label && <span className="contact-field-label">{label}</span>}
    </div>
  )
}

FieldValue.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  t: PropTypes.func.isRequired,
  f: PropTypes.func.isRequired
}

const FieldValueWithI18n = translate()(FieldValue)

const iconsByType = {
  birthday: IconBirthday,
  note: IconNote,
  company: IconCompany,
  cozy: IconCozy,
  email: IconEmail,
  address: IconAddress,
  phone: IconPhone
}

const getIcon = fieldType => iconsByType[fieldType] || IconFlag

const emptyAddress = {
  street: '',
  pobox: '',
  city: '',
  region: '',
  postcode: '',
  country: ''
}

const renderFieldValue = (value, type, t, f) => {
  if (!value) return false
  if (type === 'birthday') return f(new Date(value), 'YYYY-M-D')
  if (typeof value !== 'object') return value.toString()

  switch (type) {
    case 'address':
      return <LocationValue value={value} t={t} />
    case 'email':
      return <EmailLink address={value.address} />
    case 'phone':
      return <PhoneLink number={value.number} />
    case 'cozy':
      return <CozyValue url={value.url} />
    default:
      return <DefaultValue value={value} />
  }
}

const LocationValue = ({ value, t }) => {
  return value.formattedAddress
    ? value.formattedAddress
    : t('formatted_address', { ...emptyAddress, ...value }).trim()
}

const EmailLink = ({ address }) => {
  return <a href={`mailto:${address}`}>{address}</a>
}

const PhoneLink = ({ number }) => {
  return <a href={`tel:${number}`}>{number}</a>
}

const CozyValue = ({ url }) => url

const DefaultValue = ({ value }) => {
  return Object.keys(value)
    .map(label => `${label}: ${value[label]}`)
    .join(', ')
}

export default ContactFields
