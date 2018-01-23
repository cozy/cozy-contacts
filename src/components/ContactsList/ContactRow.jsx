import React from "react";
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
  })
};

const nametohex = (name = "") => {
  const colors = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d"
  ];
  return colors[
    Array.from(name.toUpperCase())
      .map(letter => letter.charCodeAt(0))
      .reduce((sum, number) => sum + number, 0) % colors.length
  ];
};

const ContactBadge = ({ firstname, lastname }) => {
  const style = {
    backgroundColor: `${nametohex(firstname)}`,
    color: "white"
  };
  return (
    <div className="contact-badge" style={style}>
      <span className="contact-badge-name">
        {[
          (firstname[0] || "").toUpperCase(),
          (lastname[0] || "").toUpperCase()
        ].join("")}
      </span>
    </div>
  );
};
ContactBadge.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string
};
ContactBadge.defaultProps = {
  firstname: "",
  lastname: ""
};

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
    <div className="contact">
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
  }).isRequired
};

export default ContactRow;
