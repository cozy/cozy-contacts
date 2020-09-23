import React from 'react'
import PropTypes from 'prop-types'

import { ActionsOption } from 'cozy-ui/transpiled/react/SelectBox'

const Option = props => (
  <ActionsOption
    {...props}
    withCheckbox
    actions={[
      {
        icon: 'trash',
        onClick: ({ data }) => props.selectProps.deleteGroup(data)
      }
    ]}
  />
)

Option.propTypes = {
  selectProps: PropTypes.shape({
    deleteGroup: PropTypes.func.isRequired
  })
}

export default Option
