import React from 'react'

const withSelection = WrappedComponent => {
  return class ComponentWithSelection extends React.Component {
    state = {
      selection: []
    }

    toggleSelection = data => {
      const index = this.state.selection.indexOf(data)
      this.setState(state => ({
        ...state,
        selection:
          index === -1
            ? [...state.selection, data]
            : [
                ...state.selection.slice(0, index),
                ...state.selection.slice(index + 1)
              ]
      }))
    }

    clearSelection = () =>
      this.setState(state => ({
        ...state,
        selection: []
      }))

    render() {
      return (
        <WrappedComponent
          selection={this.state.selection}
          toggleSelection={this.toggleSelection}
          clearSelection={this.clearSelection}
          {...this.props}
        />
      )
    }
  }
}

export default withSelection
