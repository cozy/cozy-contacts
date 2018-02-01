import React from "react";
import PropTypes from "prop-types";
import { Badge } from "cozy-ui/react/Badge";

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
  })
};

const ContactName = ({ firstname, lastname }) => (
  <div className="name">
    <Badge firstname={firstname} lastname={lastname} />
    <span className="name-firstname">{firstname}</span>
    &nbsp;
    <span className="name-lastname">{lastname}</span>
  </div>
);
ContactName.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string
};
ContactName.defaultProps = {
  firstname: "",
  lastname: ""
};

const ContactPhone = ({ phone }) => <div className="phone">{phone}</div>;
ContactPhone.propTypes = {
  phone: PropTypes.string
};
ContactPhone.defaultProps = {
  phone: "—"
};

const getPrimaryOrFirst = (arr = [{}]) =>
  arr.find(obj => obj.primary) || arr[0];

const ContactEmail = ({ email }) => <div className="email">{email}</div>;
ContactEmail.propTypes = {
  email: PropTypes.string
};
ContactEmail.defaultProps = {
  email: "—"
};

const ContactSelection = props => (
  <div onClick={props.onSelect}>
    <span data-input="checkbox">
      <input type="checkbox" checked={props.selected} />
      <label />
    </span>
  </div>
);
ContactSelection.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const ContactRow = props => {
  const { number: phone } = getPrimaryOrFirst(props.contact.phone) || {
    number: undefined
  };
  const { address: email } = getPrimaryOrFirst(props.contact.email) || {
    address: undefined
  };
  const {
    name: { givenName: firstname, familyName: lastname } = {
      givenName: "",
      familyName: ""
    }
  } = props.contact;
  return (
    <div className="contact-item">
      {props.selection && (
        <ContactSelection
          selected={props.selection.selected}
          onSelect={props.selection.onSelect}
        />
      )}
      <ContactName firstname={firstname} lastname={lastname} />
      <ContactPhone phone={phone} />
      <ContactEmail email={email} />
    </div>
  );
};
ContactRow.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    email: PropTypes.arrayOf(contactPropTypes.email.isRequired).isRequired,
    phone: PropTypes.arrayOf(contactPropTypes.phone)
  }).isRequired,
  selection: PropTypes.shape({
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  })
};
ContactRow.defaultProps = {
  selection: null
};

export default ContactRow;
