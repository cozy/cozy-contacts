import React from 'react'
import { unicodeNumberToChar } from '../../helpers/utils'

const ContactsListNav = ({ handleClick, activeItems }) => {
  // 26 elements corresponding to the number of letters in the alphabet
  // 97 is the ascii value of a
  const characters = unicodeNumberToChar(26, 97)
  return (
    <div className="contact-nav">
      <div className="contact-nav-wrapper">
        {characters.map(char => (
          <div className={`contact-nav-btn ${activeItems.includes(char) ? 'contact-nav-enable' : 'contact-nav-disable'}`} onClick={() => handleClick(char)}>{char}</div>
        ))}
      </div>
    </div >
  )
};

export default ContactsListNav;