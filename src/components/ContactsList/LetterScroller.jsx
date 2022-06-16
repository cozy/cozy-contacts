import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const LetterScroller = ({ contacts, hideEmpties = false, refs = {} }) => {
  const { isMobile } = useBreakpoints()

  const scrollToLetter = letter => {
    refs[letter].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  }

  const letters = [...new Set([...allLetters, ...Object.keys(contacts)])]

  return (
    <div
      className={
        isMobile
          ? 'u-pos-fixed u-flex u-flex-justify-center u-flex-column u-right-m u-bottom-xs'
          : 'u-flex u-flex-justify-center u-mh-2-half'
      }
      style={{
        zIndex: 2,
        marginTop: isMobile && 3,
        height: isMobile && 'calc(100vh - 160px - 6rem)',
        gap: 8
      }}
    >
      {letters.map(letter => {
        if (hideEmpties && !contacts[letter]) return null

        return (
          <Button
            key={letter}
            label={letter}
            subtle
            size={isMobile && 'tiny'}
            className={isMobile ? 'u-mb-0 u-mt-half' : 'u-w-1-half u-h-1-half'}
            style={isMobile ? { height: 'calc(50vh / 26)' } : {}}
            disabled={!contacts[letter]}
            onClick={() => scrollToLetter(letter)}
          />
        )
      })}
    </div>
  )
}

LetterScroller.propTypes = {
  contacts: PropTypes.object.isRequired,
  refs: PropTypes.object,
  hideEmpties: PropTypes.bool
}

export default LetterScroller
