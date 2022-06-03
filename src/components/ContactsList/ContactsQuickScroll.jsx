import React from 'react'
import get from 'lodash/get'
import Stack from 'cozy-ui/react/Stack'

const scrollTo = letter => {
  document.getElementById(letter).scrollIntoView()
}

const releaseEvent = event => {
  event.target.releasePointerCapture(event.pointerId)
}

const ContactsQuickScroll = ({ contacts }) => {
  const lettersList = contacts.map(c => {
    return get(c, 'indexes.byFamilyNameGivenNameEmailCozyUrl', '').charAt(0)
  })

  const uniqueLettersList = [...new Set(lettersList)]

  if (lettersList.length > 0) {
    return (
      <Stack spacing="xs" className="letter-selector">
        {uniqueLettersList.map(l => (
          <div
            className="letter"
            key={`Letter-${l}`}
            onPointerEnter={() => scrollTo(l)}
            onPointerDown={releaseEvent}
          >
            {l}
          </div>
        ))}
      </Stack>
    )
  }
}

export default ContactsQuickScroll
