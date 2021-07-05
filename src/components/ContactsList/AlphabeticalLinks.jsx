import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'

const filterContactInitials = categorizedContacts => {
  delete categorizedContacts.EMPTY
  return Object.keys(categorizedContacts).sort()
}

export const AlphabeticalLinks = ({ categorizedContacts, onClick }) => {
  const contactsInitials = filterContactInitials(categorizedContacts)

  return (
    <div>
      {contactsInitials.map(letter => (
        <Button
          subtle
          key={letter}
          label={letter.toUpperCase()}
          onClick={() => onClick(letter)}
          className="alphabetical-link"
        />
      ))}
    </div>
  )
}

AlphabeticalLinks.propTypes = {
  categorizedContacts: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AlphabeticalLinks
