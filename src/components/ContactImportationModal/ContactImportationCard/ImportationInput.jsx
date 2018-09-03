import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'
import Importation from '../../../importation'

class ImportationInput extends React.Component {
  state = {
    value: ''
  }

  handleOnChange = event => {
    const file = event.target.files[0]
    this.props.fileAction(file)
    this.setState(state => ({ ...state, value: '' })) // change of the input value allowing to trigger several times the onChange event with a file with the same name
  }

  render() {
    const { t } = this.context
    return (
      <span
        role="button"
        className="c-btn c-btn--secondary c-btn--subtle importation-file-selection-button"
      >
        <span>
          <Icon icon="upload" className="importation-file-selection-icon" />
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

export default ImportationInput
