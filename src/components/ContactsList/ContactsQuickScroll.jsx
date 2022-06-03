import React from 'react'
import get from 'lodash/get'
import Stack from 'cozy-ui/react/Stack'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const releaseEvent = event => {
  event.target.releasePointerCapture(event.pointerId)
}

const ContactsQuickScroll = ({ contacts, onQuickScroll }) => {
  const { isMobile } = useBreakpoints()

  const scrollToOnClick = letter => {
    if (!isMobile) {
      onQuickScroll(letter)
    }
  }

  const scrollToOnPointerEnter = letter => {
    if (isMobile) {
      onQuickScroll(letter)
    }
  }

  const lettersList = contacts.map(c => {
    return get(c, 'indexes.byFamilyNameGivenNameEmailCozyUrl', '').charAt(0)
  })

  const uniqueLettersList = [...new Set(lettersList)]

  if (uniqueLettersList.length > 0) {
    return (
      <Stack spacing="xs" className="letter-selector">
        {uniqueLettersList.map(l => (
          <div
            className="letter"
            key={`Letter-${l}`}
            onClick={() => scrollToOnClick(l)}
            onPointerEnter={() => scrollToOnPointerEnter(l)}
            onPointerDown={releaseEvent}
          >
            {l}
          </div>
        ))}
      </Stack>
    )
  } else {
    return null
  }
}

export default ContactsQuickScroll
