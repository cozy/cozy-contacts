import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ANCHOR_REGEX = /#(.)$/

const Navigation = React.memo(({ letters }) => {
  Navigation.displayName = 'Navigation'
  const [selected, setSelected] = useState(null)

  useEffect(
    () => {
      if (letters.length > 0) {
        const matches = window.location.href.match(ANCHOR_REGEX)
        const defaultValue =
          (matches && matches.length === 2 && matches[1]) || null

        if (defaultValue) {
          window.location.href = `/#${defaultValue}`
          setSelected(defaultValue)
        }
      }
    },
    [letters]
  )

  return (
    <nav className="navigation">
      <ol>
        {letters.map(letter => {
          return (
            <ButtonLink
              key={letter}
              onClick={() => setSelected(letter)}
              label={letter}
              theme={letter === selected ? 'regular' : 'secondary'}
              href={`#${letter}`}
              round
            />
          )
        })}
      </ol>
    </nav>
  )
})

Navigation.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired
}
Navigation.defaultProps = {
  letters: []
}

export default Navigation
