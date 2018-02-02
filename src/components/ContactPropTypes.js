import PropTypes from "prop-types";

const contactPropTypes = {
  phone: PropTypes.shape({
    number: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    primary: PropTypes.bool
  }),
  email: PropTypes.shape({
    address: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string
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
    postcode: PropTypes.string,
    country: PropTypes.string,
    type: PropTypes.string,
    primary: PropTypes.bool,
    label: PropTypes.string,
    formattedAddress: PropTypes.string
  }),
  cozy: PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
    primary: PropTypes.bool
  }),
  birthday: PropTypes.string,
  note: PropTypes.string
};

export default contactPropTypes;
