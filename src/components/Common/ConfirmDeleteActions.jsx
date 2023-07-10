import PropTypes from 'prop-types'
import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const ConfirmDeleteActions = ({ onCancel, onDelete, isBusy }) => {
  const { t } = useI18n()

  return (
    <>
      <Button variant="secondary" label={t('cancel')} onClick={onCancel} />
      <Button
        className="u-ml-half"
        color="error"
        label={t('delete')}
        onClick={onDelete}
        busy={isBusy}
      />
    </>
  )
}

ConfirmDeleteActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isBusy: PropTypes.bool
}

export default ConfirmDeleteActions
