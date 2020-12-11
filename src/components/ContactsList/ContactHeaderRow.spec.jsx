import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import ContactHeaderRow from './ContactHeaderRow'

// Mocking scrollToElement
import { scrollToElement } from '../../helpers/scrollToElement'
jest.mock('../../helpers/scrollToElement')

describe('ContactHeaderRow', () => {
  it('should match the ContactHeaderRow snapshot', () => {
    const tree = renderer
      .create(<ContactHeaderRow header="A" letters={['A', 'B', 'C']} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call scrollToElement on click', () => {
    const wrapper = mount(
      <ContactHeaderRow header="A" letters={['A', 'B', 'C']} />
    )
    // If we click on B
    wrapper
      .find('button')
      .at(1)
      .simulate('click')
    // scrollToElement should be called with DOM id corresponding to B
    expect(scrollToElement.mock.calls).toEqual([['CategorizedList-cat-B']])
  })
})
