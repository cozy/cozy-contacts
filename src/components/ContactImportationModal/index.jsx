import React from "react";
import PropTypes from "prop-types";
import { Alerter, Modal, ModalContent, ModalHeader } from "cozy-ui/react";
import _ from "lodash";
import { withContactsMutations } from "../../connections/allContacts";
import ExportStepsExplanation from "./ExportStepsExplanation";
import ContactImportationActions from "./ContactImportationActions";
import ContactImportationCard from "./ContactImportationCard";
import Importation from "../../importation";
import Status from "../../importation/status";

const ERROR_STATUS_SET = new Set([Status.FILE_ISSUE, Status.COMPLETE_FAILURE]);

class ContactImportationModal extends React.Component {
  state = {
    importation: Importation.init(),
    progress: null
  };

  updateImportation = importation => {
    this.setState({ importation });
  };

  selectFile = file => {
    this.updateImportation(
      Importation.selectFile(file, this.state.importation)
    );
  };

  unselectFile = () => {
    this.updateImportation(Importation.unselectFile(this.state.importation));
  };

  onProgress = progress => {
    this.setState({ progress });
  };

  importFile = async () => {
    const { importation } = this.state;
    const { createContact, closeAction } = this.props;
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: createContact,
        onProgress: this.onProgress
      }
    );

    this.updateImportation(runningImportation);

    const finishedImportation = await finishedImportationPromise;

    if (finishedImportation.status === Status.COMPLETE_SUCCESS) {
      Alerter.success("importation.complete_success", {
        smart_count: _.get(finishedImportation, "report.total", "")
      });
      closeAction();
    } else {
      this.setState({ progress: null });
      this.updateImportation(finishedImportation);
    }
  };

  render() {
    const { importation, progress } = this.state;
    const { t } = this.context;
    const { closeAction } = this.props;

    return (
      <Modal
        into="body"
        size="small"
        className={
          ERROR_STATUS_SET.has(importation.status) && "importation-error"
        }
        dismissAction={closeAction}
      >
        <ModalHeader title={t("importation.title")} />
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
    );
  }
}
ContactImportationModal.propTypes = {
  createContact: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired
};

export default withContactsMutations(ContactImportationModal);
