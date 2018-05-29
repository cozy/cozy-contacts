import React from "react";
import PropTypes from "prop-types";
import { Icon } from "cozy-ui/react";
import IconCross from "../../assets/icons/small-cross.svg";
import IconFileFailImport from "../../assets/icons/file-fail-import.svg";
import IconFilePartialImport from "../../assets/icons/file-partial-import.svg";
import IconFileVcf from "../../assets/icons/file-vcf.svg";
import IconFileWrongFormat from "../../assets/icons/file-wrong-format.svg";
import Importation from "../../importation";
import Status from "../../importation/status";

export default class ContactImportationCard extends React.Component {
  render() {
    const {
      importation,
      progress,
      onFileSelected,
      onFileUnselected
    } = this.props;
    const { report } = importation || {};
    const { t } = this.context;

    switch (importation.status) {
      case Status.UNCONFIGURED:
        return (
          <CardWrapper clickable={true}>
            <ImportationFile icon={IconFileVcf} name={null} />
            <span className="importation-message">
              {t("importation.no_file")}
            </span>
            <TransferButton fileAction={onFileSelected} />
          </CardWrapper>
        );

      case Status.FILE_ISSUE:
        return (
          <CardWrapper clickable={true}>
            <ImportationFile
              icon={IconFileWrongFormat}
              name={importation.file.name}
            />
            <span className="importation-message">
              {t(importation.fileIssue)}
            </span>
            <TransferButton fileAction={onFileSelected} />
          </CardWrapper>
        );

      case Status.READY:
        return (
          <CardWrapper clickable={false}>
            <ImportationFile
              icon={IconFileVcf}
              name={importation.file.name}
              unselectAction={onFileUnselected}
            />
            <span className="importation-status">{t("importation.ready")}</span>
          </CardWrapper>
        );

      case Status.RUNNING:
        return (
          <CardWrapper clickable={false}>
            <ImportationFile icon={IconFileVcf} name={importation.file.name} />
            <span className="importation-status">
              {t("importation.running")}
            </span>
            {progress && (
              <progress value={progress.current} max={progress.total} />
            )}
          </CardWrapper>
        );

      case Status.PARTIAL_SUCCESS:
        return (
          <CardWrapper clickable={true}>
            <ImportationFile
              icon={IconFilePartialImport}
              name={importation.file.name}
              unselectAction={onFileUnselected}
            />
            <span className="importation-message">
              {t("importation.partial_success", {
                smart_count: report.imported,
                total: report.total
              })}
            </span>
            {Importation.canRetry(importation) && (
              <span className="importation-message">
                {t("importation.retry_hint")}
              </span>
            )}
          </CardWrapper>
        );

      case Status.COMPLETE_FAILURE:
        return (
          <CardWrapper clickable={true}>
            <ImportationFile
              icon={IconFileFailImport}
              name={importation.file.name}
            />
            <span className="importation-message">
              {t("importation.complete_failure")}
            </span>
            {Importation.canRetry(importation) && (
              <span className="importation-message">
                {t("importation.retry_or_select_another_hint")}
              </span>
            )}
            <TransferButton fileAction={onFileSelected} />
          </CardWrapper>
        );

      default:
        // eslint-disable-next-line
        console.warn(
          "ContactImportationCard: unexpected importation status:",
          importation.status
        );
    }
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

function CardWrapper({ clickable, children }) {
  let wrapperClass = "importation-card";
  if (clickable) {
    return (
      <label className={`${wrapperClass} ${wrapperClass}-clickable`}>
        {children}
      </label>
    );
  } else {
    return <div className={wrapperClass}>{children}</div>;
  }
}
CardWrapper.propTypes = {
  clickable: PropTypes.bool,
  children: PropTypes.node.isRequired
};
CardWrapper.defaultProps = {
  clickable: false
};

function ImportationFile({ icon, name, unselectAction }) {
  return (
    <div className="importation-file">
      <Icon icon={icon} className="importation-file-icon" />
      {name && (
        <span className="importation-file-name">
          {name}
          {unselectAction && (
            <button className="importation-file-oval" onClick={unselectAction}>
              <Icon className="importation-file-cross" icon={IconCross} />
            </button>
          )}
        </span>
      )}
    </div>
  );
}
ImportationFile.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string,
  unselectAction: PropTypes.func
};
ImportationFile.defaultProps = {
  name: undefined,
  unselectAction: undefined
};

class TransferButton extends React.Component {
  render() {
    const { fileAction } = this.props;
    const { t } = this.context;
    return (
      <span
        role="button"
        className="c-btn c-btn--secondary c-btn--subtle importation-file-selection-button"
      >
        <span>
          <Icon icon="upload" className="importation-file-selection-icon" />
          {t("importation.transfer_file")}
          <input
            className="importation-file-selection-input"
            type="file"
            accept={Importation.VALID_FILE_TYPES.join(", ")}
            onChange={event => fileAction(event.target.files[0])}
          />
        </span>
      </span>
    );
  }
}
TransferButton.propTypes = {
  fileAction: PropTypes.func.isRequired
};
