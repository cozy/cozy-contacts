import PropTypes from "prop-types";
import React from "react";
import { Icon } from "cozy-ui/react";
import IconFileVcf from "../../assets/icons/file-vcf.svg";
import IconFileWrongFormat from "../../assets/icons/file-wrong-format.svg";
import IconFilePartialImport from "../../assets/icons/file-partial-import.svg";
import IconFileFailImport from "../../assets/icons/file-fail-import.svg";
import IconCross from "../../assets/icons/small-cross.svg";
import Status from "../../importation/status";

function fileIcon(status) {
  switch (status) {
    case Status.FILE_ISSUE:
      return IconFileWrongFormat;
    case Status.PARTIAL_SUCCESS:
      return IconFilePartialImport;
    case Status.COMPLETE_FAILURE:
      return IconFileFailImport;
    default:
      return IconFileVcf;
  }
}

const UNSELECTABLE_FILE_STATUS_SET = new Set([
  Status.READY,
  Status.PARTIAL_SUCCESS
]);

export default function ImportationFile({ status, name, unselectAction }) {
  return (
    <div className="importation-file">
      <Icon icon={fileIcon(status)} className="importation-file-icon" />
      {name && (
        <span className="importation-file-name">
          {name}
          {UNSELECTABLE_FILE_STATUS_SET.has(status) && (
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
  status: Status.propType.isRequired,
  name: PropTypes.string,
  unselectAction: PropTypes.func
};
ImportationFile.defaultProps = {
  name: undefined,
  unselectAction: undefined
};
