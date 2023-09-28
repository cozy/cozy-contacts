import PropTypes from 'prop-types'
import React, { useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import UploadIcon from 'cozy-ui/transpiled/react/Icons/Upload'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Importation from '../../../importation'

const ImportationInput = ({ fileAction }) => {
  const { t } = useI18n()
  const [value, setValue] = useState('')

  const handleOnChange = event => {
    const file = event.target.files[0]
    fileAction(file)
    setValue('') // change of the input value allowing to trigger several times the onChange event with a file with the same name
  }

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
          onChange={handleOnChange}
          value={value}
        />
      </span>
    </span>
  )
}
ImportationInput.propTypes = {
  fileAction: PropTypes.func.isRequired
}

export default ImportationInput
