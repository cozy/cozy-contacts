import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

const Letter = props => {
  const { letter, ...rest } = props

  return (
    <Typography className="u-mr-2" {...rest}>
      {letter.toUpperCase()}
    </Typography>
  )
}

export default Letter
