import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import ContactImportationCardWrapper from './ContactImportationCardWrapper'
import ContactImportationFile from './ContactImportationFile'
import ContactImportationMessage from './ContactImportationMessage'
import ImportationInput from './ImportationInput'
import ImportationHelper from '../../../importation'
import Status from '../../../importation/status'

const ContactImportationCard = props => {
  const { importation, progress, onFileSelected, onFileUnselected, t } = props
  const { status } = importation
  const mainMessage = mainMessageText(importation, t)
  const retryMessage = retryMessageText(importation, t)

  return (
    <ContactImportationCardWrapper clickable={isCardClickable(status)}>
      <ContactImportationFile
        status={status}
        name={ImportationHelper.filename(importation)}
        unselectAction={onFileUnselected}
      />
      {mainMessage && <ContactImportationMessage text={mainMessage} />}
      {retryMessage && <ContactImportationMessage text={retryMessage} />}
      {isTransferButtonDisplayed(status) ? (
        <ImportationInput fileAction={onFileSelected} />
      ) : (
        isStatusDisplayed(status) && (
          <span className="importation-status">{t(statusKey(status))}</span>
        )
      )}
      {progress && <progress value={progress.current} max={progress.total} />}
    </ContactImportationCardWrapper>
  )
}
ContactImportationCard.propTypes = {
  importation: ImportationHelper.propType.isRequired,
  progress: PropTypes.object,
  onFileSelected: PropTypes.func.isRequired,
  onFileUnselected: PropTypes.func.isRequired
}
ContactImportationCard.defaultProps = {
  progress: undefined
}
export default translate()(ContactImportationCard)
const CLICKABLE_STATUS_SET = new Set([
  Status.UNCONFIGURED,
  Status.FILE_ISSUE,
  Status.PARTIAL_SUCCESS,
  Status.COMPLETE_FAILURE
])

function isCardClickable(status) {
  return CLICKABLE_STATUS_SET.has(status)
}

const DISPLAYED_TRANSFER_BUTTON_STATUS_SET = new Set([
  Status.UNCONFIGURED,
  Status.FILE_ISSUE,
  Status.COMPLETE_FAILURE
])

function isTransferButtonDisplayed(status) {
  return DISPLAYED_TRANSFER_BUTTON_STATUS_SET.has(status)
}

const DISPLAYED_STATUS_KEY_MAP = new Map([
  [Status.READY, 'importation.ready'],
  [Status.RUNNING, 'importation.running']
])

function isStatusDisplayed(status) {
  return DISPLAYED_STATUS_KEY_MAP.has(status)
}

function statusKey(status) {
  return DISPLAYED_STATUS_KEY_MAP.get(status)
}

function mainMessageText(importation, t) {
  switch (importation.status) {
    case Status.UNCONFIGURED:
      return t('importation.no_file')
    case Status.FILE_ISSUE:
      return t(importation.fileIssue)
    case Status.PARTIAL_SUCCESS:
      return t('importation.partial_success', {
        smart_count: importation.report.imported,
        total: importation.report.total
      })
    case Status.COMPLETE_FAILURE:
      return t('importation.complete_failure')
  }
}

function retryMessageText(importation, t) {
  if (ImportationHelper.canRetry(importation)) {
    switch (importation.status) {
      case Status.PARTIAL_SUCCESS:
        return t('importation.retry_hint')
      case Status.COMPLETE_FAILURE:
        return t('importation.retry_or_select_another_hint')
    }
  }
}
