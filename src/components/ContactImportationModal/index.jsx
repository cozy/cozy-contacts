import React from 'react'
import PropTypes from 'prop-types'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Modal, {
  ModalContent,
  ModalHeader
} from 'cozy-ui/transpiled/react/Modal'
import withContactsMutations from '../../connections/allContacts'
import ExportStepsExplanation from './ExportStepsExplanation'
import ContactImportationActions from './ContactImportationActions'
import ContactImportationCard from './ContactImportationCard'
import Importation from '../../importation'
import Status from '../../importation/status'
import { translate } from 'cozy-ui/transpiled/react/I18n'

const ERROR_STATUS_SET = new Set([Status.FILE_ISSUE, Status.COMPLETE_FAILURE])

class ContactImportationModal extends React.Component {
  state = {
    importation: Importation.INIT,
    progress: null
  }

  updateImportation = importation => {
    this.setState({ importation })
  }

  selectFile = file => {
    this.updateImportation(Importation.selectFile(file, this.state.importation))
  }

  unselectFile = () => {
    this.updateImportation(Importation.unselectFile(this.state.importation))
  }

  onProgress = progress => {
    this.setState({ progress })
  }

  importFile = async () => {
    const { importation } = this.state
    const { importContact, closeAction, t } = this.props
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: importContact,
        onProgress: this.onProgress
      }
    )

    this.updateImportation(runningImportation)

    const finishedImportation = await finishedImportationPromise
    if (finishedImportation.status === Status.COMPLETE_SUCCESS) {
      const created = Importation.created(finishedImportation)
      const updated = Importation.updated(finishedImportation)
      const stringCreated =
        created > 0 ? t('importation.creation', created) : ''
      const stringUpdated =
        updated > 0
          ? created > 0
            ? `, ${t('importation.update', updated)}`
            : `${t('importation.update', updated)}`
          : ''
      Alerter.success(
        `${t('importation.complete_success')} ${stringCreated}${stringUpdated}`
      )
      closeAction()
    } else {
      this.setState({ progress: null })
      this.updateImportation(finishedImportation)
    }
  }

  render() {
    const { importation, progress } = this.state
    const { closeAction, t } = this.props

    return (
      <Modal
        into="body"
        size="small"
        className={
          ERROR_STATUS_SET.has(importation.status) && 'importation-error'
        }
        dismissAction={closeAction}
      >
        <ModalHeader title={t('importation.title')} />
        <ModalContent>
          <ExportStepsExplanation />
          <ContactImportationCard
            importation={importation}
            progress={progress}
            onFileSelected={this.selectFile}
            onFileUnselected={this.unselectFile}
          />
          <ContactImportationActions
            importation={importation}
            cancelAction={closeAction}
            importAction={this.importFile}
          />
        </ModalContent>
      </Modal>
    )
  }
}
ContactImportationModal.propTypes = {
  importContact: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired
}

export default translate()(withContactsMutations(ContactImportationModal))
