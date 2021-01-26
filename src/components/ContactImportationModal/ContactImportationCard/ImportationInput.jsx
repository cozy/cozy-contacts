import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/transpiled/react/Icon'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import UploadIcon from 'cozy-ui/transpiled/react/Icons/Upload'

import Importation from '../../../importation'

class ImportationInput extends React.Component {
  state = {
    value: ''
  }

  handleOnChange = event => {
    const file = event.target.files[0]
    this.props.fileAction(file)
    this.setState({ value: '' }) // change of the input value allowing to trigger several times the onChange event with a file with the same name
  }

  render() {
    const { t } = this.props
    return (
      <span
        role="button"
        className="c-btn c-btn--secondary c-btn--subtle importation-file-selection-button"
      >
        <span>
          <Icon
            icon={UploadIcon}
            className="importation-file-selection-icon u-mr-half"
          />
          {t('importation.transfer_file')}
          <input
            className="importation-file-selection-input"
            type="file"
            accept={Importation.VALID_FILE_TYPES.join(', ')}
            onChange={this.handleOnChange}
            value={this.state.value}
          />
        </span>
      </span>
    )
  }
}
ImportationInput.propTypes = {
  fileAction: PropTypes.func.isRequired
}

export default translate()(ImportationInput)
