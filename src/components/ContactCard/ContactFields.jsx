import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'cozy-ui/transpiled/react/Icon'
import palette from 'cozy-ui/transpiled/react/palette'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import FieldsetTitle from '../Components/FieldsetTitle'
import Fieldset from '../Components/Fieldset'

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

const ContactField = ({ type, values }) => (
  <div className="u-flex u-mt-half">
    <div className="u-mr-1 u-fz-large">
      <Icon icon={getIcon(type)} color={palette['coolGrey']} />
    </div>
    <div>
      {values.map((value, index) => (
        <FieldValue type={type} value={value} key={index} />
      ))}
    </div>
  </div>
)

ContactField.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}

const FieldValue = ({ type, value }) => {
  const { t, f } = useI18n()
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
  ])
}

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
