import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import FieldsetTitle from '../Components/FieldsetTitle'
import Fieldset from '../Components/Fieldset'
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
    {title && <FieldsetTitle title={title} />}
    <Fieldset>
      {fields.filter(field => field.values.length > 0).map((field, index) => (
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

const ContactField = ({ type, values }) => (
  <div className="u-flex u-mt-half">
    <div className="u-mr-1 u-fz-large">
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
    <div className="u-mb-half u-breakword u-fz-medium">
      {renderedValue}
      {label && <span className="u-ph-half u-dn-s">·</span>}
      {label && <span className="u-fz-small u-coolgrey u-db-s">{label}</span>}
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

export const getFormattedAddress = (address, t) => {
  if (address.formattedAddress) {
    return address.formattedAddress
  } else {
    return t('formatted_address', { ...emptyAddress, ...address }).trim()
  }
}

const renderFieldValue = (value, type, t, f) => {
  if (!value) return false
  if (type === 'birthday') return f(new Date(value), 'YYYY-M-D')
  if (typeof value !== 'object') return value.toString()

  switch (type) {
    case 'address':
      return <LocationLink value={value} t={t} />
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

const LocationLink = ({ value, t }) => {
  let location = getFormattedAddress(value, t)
  const osmUrl = 'https://nominatim.openstreetmap.org/search?format=html&q='
  let url = `${osmUrl}${encodeURI(location)}`
  return (
    <a href={url} className="u-link" target="_blank" rel="noopener noreferrer">
      {location}
    </a>
  )
}

const EmailLink = ({ address }) => {
  return (
    <a href={`mailto:${address}`} className="u-link">
      {address}
    </a>
  )
}

const PhoneLink = ({ number }) => {
  return (
    <a href={`tel:${number}`} className="u-link">
      {number}
    </a>
  )
}

const CozyValue = ({ url }) => {
  return (
    <a href={url} className="u-link">
      {url}
    </a>
  )
}

const DefaultValue = ({ value }) => {
  return Object.keys(value)
    .map(label => `${label}: ${value[label]}`)
    .join(', ')
}

export default ContactFields
