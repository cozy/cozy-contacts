import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import UploadIcon from 'cozy-ui/transpiled/react/Icons/Upload'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Importation from '../../../importation'

import styles from '@/styles/contactImportation.styl'

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
      className={cx(
        styles['importation-file-selection-button'],
        'u-flex',
        'u-flex-row',
        'u-flex-justify-center'
      )}
    >
      <Icon
        icon={UploadIcon}
        className={cx(
          styles['importation-file-selection-icon'],
          'u-mr-half',
          'u-c-pointer'
        )}
      />
      {t('importation.transfer_file')}
      <input
        className={cx(
          styles['importation-file-selection-input'],
          'u-c-pointer'
        )}
        type="file"
        accept={Importation.VALID_FILE_TYPES.join(', ')}
        onChange={handleOnChange}
        value={value}
      />
    </span>
  )
}
ImportationInput.propTypes = {
  fileAction: PropTypes.func.isRequired
}

export default ImportationInput
