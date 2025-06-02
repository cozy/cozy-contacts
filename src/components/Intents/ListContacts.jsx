import AppRouter from 'components/AppRouter'
import PropTypes from 'prop-types'
import React from 'react'

import IntentMain from './IntentMain'

const ListContacts = () => {
  return (
    <div className="intent-layout">
      <IntentMain>
        <AppRouter withTopBar={false} />
      </IntentMain>
    </div>
  )
}

ListContacts.propTypes = {
  data: PropTypes.func,
  onTerminate: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func
}

export default ListContacts
