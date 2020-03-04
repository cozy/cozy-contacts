import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'cozy-ui/transpiled/react'

const Alphabets = ({ scrollTo }) => {
  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const style = { pointerEvents: 'all' }

  return (
    <div className="alphabets">
      {alphabet.map(letter => (
        <Button
          onClick={() => { scrollTo(letter) }}
          label={letter}
          theme="secondary"
          style={style}
          extension="narrow"
          size='small'
        />
      ))}
    </div>
  )
}

Alphabets.propTypes = {
  scrollTo: PropTypes.func
}

export default Alphabets
