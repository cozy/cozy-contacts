import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import { Box } from '@material-ui/core'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedListNavigation = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const characterButtonHandler = character => {
    const targetElement = document.getElementById(`list_${character}`)
    if (targetElement) {
      targetElement.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }

  return (
    <Box
      className="topbar"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {Object.entries(categorizedContacts).map(([header]) => (
        <Button
          key={header}
          style={{ width: '15px', display: 'inline-block' }}
          variant="outlined"
          color="primary"
          onClick={() => characterButtonHandler(header)}
        >
          {header}
        </Button>
      ))}
    </Box>
  )
}

export default CategorizedListNavigation
