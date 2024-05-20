import PropTypes from 'prop-types'
import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import Importation from '../../importation'
import Status from '../../importation/status'

const ImportationActions = ({ cancelAction, importAction, importation, t }) => {
  return (
    <>
      <Button
        label={t('importation.cancel')}
        variant="secondary"
        onClick={cancelAction}
      />
      {Importation.canRetry(importation) ? (
        <Button label={t('importation.retry')} onClick={importAction} />
      ) : (
        <Button
          label={t('importation.run')}
          disabled={!Importation.canRun(importation)}
          busy={importation.status === Status.RUNNING}
          onClick={importAction}
        />
      )}
    </>
  )
}

ImportationActions.propTypes = {
  cancelAction: PropTypes.func.isRequired,
  importAction: PropTypes.func.isRequired,
  importation: Importation.propType.isRequired
}

export default translate()(ImportationActions)
