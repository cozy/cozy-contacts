import React from "react";
import PropTypes from "prop-types";
import contactPropTypes from "../ContactPropTypes";
import { Avatar } from "cozy-ui/react/Avatar";
import { getInitials } from "../../helpers/contacts";

const ContactIdentity = ({ name, myself }) => (
  <div className="contact-identity">
    <Avatar text={getInitials(name).toUpperCase()} size="small" />
    <ContactName firstname={name.givenName} lastname={name.familyName} />
    {myself && <MyselfMarker />}
  </div>
);
ContactIdentity.propTypes = {
  name: contactPropTypes.name.isRequired,
  myself: PropTypes.bool
};
ContactIdentity.defaultProps = {
  myself: false
};

const ContactName = ({ firstname, lastname }) => (
  <div>
    <span className="contact-firstname">{firstname}</span>
    &nbsp;
    <span className="contact-lastname">{lastname}</span>
  </div>
);
ContactName.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  me: PropTypes.bool
};
ContactName.defaultProps = {
  firstname: "",
  lastname: "",
  me: false
};

const MyselfMarker = (props, { t }) => (
  <span className="contact-myself">({t("me")})</span>
);

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
  <div
    className="contact-selection"
    onClick={e => {
      e.stopPropagation();
      props.onSelect(e);
    }}
  >
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
  const name = props.contact.name || {};
  const isMyself = props.contact.metadata ? !!props.contact.metadata.me : false;
  return (
    <div className="contact" onClick={props.onClick}>
      {props.selection && (
        <ContactSelection
          selected={props.selection.selected}
          onSelect={props.selection.onSelect}
        />
      )}
      <ContactIdentity name={name} myself={isMyself} />
      <ContactPhone phone={phone} />
      <ContactEmail email={email} />
    </div>
  );
};
ContactRow.propTypes = {
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    email: PropTypes.arrayOf(contactPropTypes.email.isRequired).isRequired,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    metadata: contactPropTypes.metadata
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
