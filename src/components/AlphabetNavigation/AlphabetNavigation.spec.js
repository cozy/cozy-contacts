import React from 'react'
import AlphabetNavigation from './AlphabetNavigation'
import renderer from 'react-test-renderer'

it('should match the snapshot', () => {
  const contacts = [{ name: { familyName: 'Doe' } }]

  const tree = renderer
    .create(<AlphabetNavigation contacts={contacts} onNavigate={() => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
