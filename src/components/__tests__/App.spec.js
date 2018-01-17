import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

describe('App component only', () => {
  it('should be mounted correctly', () => {
    const component = renderer.create(<App />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
