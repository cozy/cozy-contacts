import React from 'react'

import ContactIdentity from 'cozy-ui/transpiled/react/ContactsList/Contacts/ContactIdentity'

const Cell = ({ row, column, cell }) => {
  if (column.id === 'fullname') {
    return <ContactIdentity contact={row} noWrapper />
  }

  return cell
}

export default React.memo(Cell)
