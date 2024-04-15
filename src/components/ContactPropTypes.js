import PropTypes from 'prop-types'

const contactAttrPropTypes = {
  label: PropTypes.oneOf(['home', 'work'])
}

const contactPropTypes = {
  phone: PropTypes.shape({
    number: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: contactAttrPropTypes.label,
    primary: PropTypes.bool
  }),
  email: PropTypes.shape({
    address: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    type: PropTypes.string,
    label: contactAttrPropTypes.label
  }),
  name: PropTypes.shape({
    familyName: PropTypes.string,
    givenName: PropTypes.string,
    additionalName: PropTypes.string,
    namePrefix: PropTypes.string,
    nameSuffix: PropTypes.string
  }),
  address: PropTypes.shape({
    street: PropTypes.string,
    pobox: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    country: PropTypes.string,
    number: PropTypes.string,
    code: PropTypes.string,
    locality: PropTypes.string,
    building: PropTypes.string,
    stairs: PropTypes.string,
    floor: PropTypes.string,
    apartment: PropTypes.string,
    entrycode: PropTypes.string,
    type: PropTypes.string,
    label: contactAttrPropTypes.label,
    primary: PropTypes.bool,
    formattedAddress: PropTypes.string
  }),
  cozy: PropTypes.shape({
    url: PropTypes.string,
    type: PropTypes.string,
    label: contactAttrPropTypes.label,
    primary: PropTypes.bool
  }),
  birthday: PropTypes.string,
  note: PropTypes.string,
  metadata: PropTypes.shape({
    version: PropTypes.number,
    cozy: PropTypes.bool,
    me: PropTypes.bool
  })
}

export const fullContactPropTypes = PropTypes.shape({
  name: contactPropTypes.name,
  phone: PropTypes.arrayOf(contactPropTypes.phone),
  email: PropTypes.arrayOf(contactPropTypes.email),
  address: PropTypes.arrayOf(contactPropTypes.address),
  cozy: PropTypes.arrayOf(contactPropTypes.cozy),
  birthday: contactPropTypes.birthday,
  note: contactPropTypes.note
})

export default contactPropTypes
