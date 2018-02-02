import React from "react";
import PropTypes from "prop-types";

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

export default ContactBadge;
