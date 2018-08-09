import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import withSelection from './withSelection'

const DummyComponent = ({ title = '' }) => <span title={title} />
const DummyComponentWithSelection = withSelection(DummyComponent)

DummyComponent.propTypes = {
  title: PropTypes.string
}

describe('A component with selection', () => {
  let testedComponent

  beforeEach(() => {
    const root = <DummyComponentWithSelection />
    testedComponent = shallow(root)
  })

  it('should toggle the selection', () => {
    expect(testedComponent.prop('selection')).toEqual([])

    testedComponent.prop('toggleSelection')(1)
    testedComponent.prop('toggleSelection')(2)
    testedComponent.update()

    expect(testedComponent.prop('selection')).toEqual([1, 2])

    testedComponent.prop('toggleSelection')(2)
    testedComponent.update()
    expect(testedComponent.prop('selection')).toEqual([1])
  })

  it('should clear the selection', () => {
    expect(testedComponent.prop('selection').length).toEqual(0)

    testedComponent.prop('toggleSelection')(1)
    testedComponent.prop('toggleSelection')(2)
    testedComponent.update()

    expect(testedComponent.prop('selection').length).toEqual(2)

    testedComponent.prop('clearSelection')()
    testedComponent.update()

    expect(testedComponent.prop('selection').length).toEqual(0)
  })

  it('should pass other props', () => {
    const root = <DummyComponentWithSelection title="with prop" />
    testedComponent = shallow(root)

    expect(testedComponent.prop('title')).toEqual('with prop')
  })
})
