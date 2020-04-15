import React, { PureComponent } from 'react'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import '../../styles/spinner.styl'
class SpinnerContact extends PureComponent {
  render() {
    const { size, loadingType } = this.props
    return (
      <div className="spinner">
        <Spinner size={size} loadingType={loadingType} middle={true} />
      </div>
    )
  }
}

export default SpinnerContact
