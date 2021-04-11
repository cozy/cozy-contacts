import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import palette from 'cozy-ui/transpiled/react/palette'
import Chip from 'cozy-ui/transpiled/react/Chip'

const useStyles = makeStyles(() => ({
  root: {
    display: 'none',
    '@supports (position: sticky)': {
      position: 'sticky',
      display: 'flex',
      flexDirection: 'column',
      width: '1.5rem',
      height: 'fit-content',
      top: '3rem',
      right: '.5rem',
      margin: 0,
      padding: '.5rem',
      zIndex: 2,
      textTransform: 'uppercase',
      backgroundColor: 'transparent'
    }
  },
  letter: {
    cursor: 'pointer'
  },
  disabledLetter: {
    color: palette['coolGrey']
  }
}))

const VerticalLettersChip = ({ letters }) => {
  const classes = useStyles()

  return (
    <Chip
      className={classes.root}
      variant="default"
      data-testid="vertical-letters-chip"
    >
      {letters.map(letter => (
        <div key={`letter-${letter.name}`} className="u-mb-half u-fz-tiny">
          {letter.ref ? (
            <a
              onClick={() =>
                letter.ref.current.scrollIntoView({ behavior: 'smooth' })
              }
              className={`u-link ${classes.letter}`}
            >
              {letter.name}
            </a>
          ) : (
            <span className={classes.disabledLetter}>{letter.name}</span>
          )}
        </div>
      ))}
    </Chip>
  )
}

VerticalLettersChip.propTypes = {
  letters: PropTypes.array.isRequired
}

export default VerticalLettersChip
