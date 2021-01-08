import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ContactListTargetContent = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column !important;
  flex-flow: wrap row;
  background: #ecf0f1;
  padding: 0.5em;
  opacity: 0.5;
  height: 100%;
  overflow-y: auto;
  &:hover {
    opacity: 1;
  }
  span {
    display: flex;
    // Center align the letters within each box
    justify-content: center;
    padding: 0.5em;
    border-radius: 8px;
    font-size: 1.2em;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;
    color: darkgray;
    cursor: pointer;
    &:hover {
      background: #ddd;
      color: var(--regularButtonPrimaryColor);
    }
  }
`;

const useContactListTarget = (contacts, listRef) => {
  const [letters, setLetters] = useState([]);

  const onClick = letter => {
    const dividers = document.getElementsByClassName("divider");
    for (let divider of dividers) {
      const l = divider.getAttribute("data-letter");
      if (l === letter.toLowerCase()) {
        const y = divider.offsetTop;
        listRef.current.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    contacts.forEach(contact => {
      const { name } = contact;
      if (name && (name.familyName || name.givenName)) {
        const { familyName, givenName } = name;
        const letter = familyName ? familyName.charAt(0) : givenName.charAt(0);
        setLetters(l => {
          if (!l.includes(letter)) {
            return l.concat([letter]);
          }
          return l;
        });
      } else {
      }
    });
  }, [contacts]);

  return { contacts, letters, onClick };
};

const ContactListTarget = ({ contacts, listRef }) => {
  const { letters, onClick } = useContactListTarget(contacts, listRef);
  return (
    <ContactListTargetContent>
      {letters.map(l => (
        <span key={l} onClick={() => onClick(l)}>
          {l.toUpperCase()}
        </span>
      ))}
    </ContactListTargetContent>
  );
};

ContactListTarget.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactListTarget;
