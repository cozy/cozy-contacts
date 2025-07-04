import React, { PureComponent } from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'

import styles from '@/styles/spinner.styl'

class SpinnerContact extends PureComponent {
  render() {
    const { size, loadingType } = this.props
    return (
      <div className={styles['spinner']} data-testid="contactSpinner">
        <Spinner size={size} loadingType={loadingType} middle={true} />
      </div>
    )
  }
}

export default SpinnerContact
