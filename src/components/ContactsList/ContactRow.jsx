import React from "react";
import PropTypes from "prop-types";
import ContactBadge from "../ContactBadge";
import contactPropTypes from "../ContactPropTypes";

const ContactName = ({ firstname, lastname }) => (
  <div className="contact-name">
    <span className="contact-name-firstname">{firstname}</span>
    <span>&nbsp;</span>
    <span className="contact-name-lastname">{lastname}</span>
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

const ContactPhone = ({ phone }) => (
  <div className="contact-phone">{phone}</div>
);
ContactPhone.propTypes = {
  phone: PropTypes.string
};
ContactPhone.defaultProps = {
  phone: "—"
};

const getPrimaryOrFirst = (arr = [{}]) =>
  arr.find(obj => obj.primary) || arr[0];

const ContactEmail = ({ email }) => (
  <div className="contact-email">{email}</div>
);
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
  const stopPropagationAndSelect = e => {
    e.stopPropagation();
    props.selection.onSelect(e);
  };
  return (
    <div className="contact" onClick={props.onClick}>
      {props.selection && (
        <ContactSelection
          selected={props.selection.selected}
          onSelect={stopPropagationAndSelect}
        />
      )}
      <ContactBadge firstname={firstname} lastname={lastname} />
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
  }),
  onClick: PropTypes.func
};
ContactRow.defaultProps = {
  selection: null,
  onClick: null
};

export default ContactRow;
