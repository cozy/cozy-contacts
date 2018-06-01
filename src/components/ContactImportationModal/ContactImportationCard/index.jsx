import React from "react";
import PropTypes from "prop-types";
import ContactImportationFile from "./ContactImportationFile";
import ContactTransferButton from "./ContactTransferButton";
import Importation from "../../../importation";
import Status from "../../../importation/status";

const CLICKABLE_STATUS_SET = new Set([
  Status.UNCONFIGURED,
  Status.FILE_ISSUE,
  Status.PARTIAL_SUCCESS,
  Status.COMPLETE_FAILURE
]);

export default class ContactImportationCard extends React.Component {
  render() {
    const {
      importation,
      progress,
      onFileSelected,
      onFileUnselected
    } = this.props;
    const { status } = importation;
    const { t } = this.context;

    return (
      <CardWrapper clickable={CLICKABLE_STATUS_SET.has(status)}>
        <ContactImportationFile
          status={status}
          name={Importation.filename(importation)}
          unselectAction={onFileUnselected}
        />
        <ImportationMessage text={mainMessageText(importation, t)} />
        <ImportationMessage text={retryMessageText(importation, t)} />
        <ContactTransferButton status={status} fileAction={onFileSelected} />
        {progress && <progress value={progress.current} max={progress.total} />}
      </CardWrapper>
    );
  }
}
ContactImportationCard.propTypes = {
  importation: Importation.propType.isRequired,
  progress: PropTypes.object,
  onFileSelected: PropTypes.func.isRequired,
  onFileUnselected: PropTypes.func.isRequired
};
ContactImportationCard.defaultProps = {
  progress: undefined
};

const WRAPPER_CLASS = "importation-card";

function CardWrapper({ clickable, children }) {
  if (clickable) {
    return (
      <label className={`${WRAPPER_CLASS} ${WRAPPER_CLASS}-clickable`}>
        {children}
      </label>
    );
  } else {
    return <div className={WRAPPER_CLASS}>{children}</div>;
  }
}
CardWrapper.propTypes = {
  clickable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

function ImportationMessage({ text }) {
  if (text) {
    return <span className="importation-message">{text}</span>;
  }
}
ImportationMessage.propTypes = {
  text: PropTypes.string
};
ImportationMessage.defaultProps = {
  text: undefined
};

function mainMessageText(importation, t) {
  switch (importation.status) {
    case Status.UNCONFIGURED:
      return t("importation.no_file");
    case Status.FILE_ISSUE:
      return t(importation.fileIssue);
    case Status.PARTIAL_SUCCESS:
      return t("importation.partial_success", {
        smart_count: importation.report.imported,
        total: importation.report.total
      });
    case Status.COMPLETE_FAILURE:
      return t("importation.complete_failure");
  }
}

function retryMessageText(importation, t) {
  if (Importation.canRetry(importation)) {
    switch (importation.status) {
      case Status.PARTIAL_SUCCESS:
        return t("importation.retry_hint");
      case Status.COMPLETE_FAILURE:
        return t("importation.retry_or_select_another_hint");
    }
  }
}
