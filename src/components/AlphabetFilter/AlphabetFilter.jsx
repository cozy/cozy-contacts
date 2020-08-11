import React from 'react'

import alphabetFilterContainer from './alphabetFilterContainer'

const AlphabetFilter = ({ contacts, filterByLetter, resetFilter }) => {
  const letters = getInitialesInOrder(contacts)

  if (letters.length < 2) {
    return null
  }

  return (
    <ul className="alphabet-filter">
      {letters.length > 0 &&
        letters.map((l, i) => (
          <li className="letter" key={i}>
            <button
              className="filter-btn letter-btn"
              onClick={() => filterByLetter(l)}
            >
              {l}
            </button>
          </li>
        ))}
      <li className="letter">
        <button className="filter-btn reset-btn" onClick={() => resetFilter()}>
          Reset filter
        </button>
      </li>
    </ul>
  )
}

const getInitialesInOrder = contacts => {
  const letters = contacts.map(
    c => (c.name ? c.name.familyName.charAt(0) : null)
  )
  const orderedletters = letters.filter(l => l !== null).sort()
  return [...new Set(orderedletters)]
}

export default alphabetFilterContainer(AlphabetFilter)
