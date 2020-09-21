import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'cozy-ui/transpiled/react/Chip'

const LETTER_LIST = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'RESET'
]

export function ContactListLetterSelection({
  letterList = LETTER_LIST,
  onClick
}) {
  const letterItemList = letterList.map((value, index) => (
    <Chip
      size="tiny"
      component="button"
      onClick={onClick}
      key={index}
      value={value}
    >
      {value}
    </Chip>
  ))

  return <div>{letterItemList}</div>
}

ContactListLetterSelection.propTypes = {
  letterList: PropTypes.array,
  onClick: PropTypes.func.isRequired
}
