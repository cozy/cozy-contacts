// Importation model.
// "Importation" because "import" is a reserved keyword.

import _ from "lodash";
import PropTypes from "prop-types";
import Report from "./report";
import Status from "./status";
import vcard from "./vcard";

const EMPTY_FILE = "importation.empty_file";
const INVALID_FILE_TYPE = "importation.invalid_file_type";

const propType = PropTypes.shape({
  file: PropTypes.instanceOf(File),
  fileIssue: PropTypes.oneOf([EMPTY_FILE, INVALID_FILE_TYPE]),
  report: Report.propType,
  status: Status.propType.isRequired
});

const VALID_FILE_TYPES = vcard.FILE_TYPES;

export default {
  EMPTY_FILE,
  INVALID_FILE_TYPE,
  VALID_FILE_TYPES,
  canRetry,
  canRun,
  filename,
  init,
  propType,
  run,
  selectFile,
  unselectFile
};

function init() {
  return {
    status: Status.UNCONFIGURED,
    file: undefined,
    fileIssue: undefined,
    report: undefined
  };
}

function filename(importation) {
  return _.get(importation, "file.name");
}

function selectFile(file, importation) {
  return _validateSelectedFile({
    ...importation,
    file,
    fileIssue: undefined,
    report: undefined
  });
}

function unselectFile(importation) {
  return {
    ...importation,
    file: undefined,
    fileIssue: undefined,
    report: undefined,
    status: Status.UNCONFIGURED
  };
}

function _validateSelectedFile(importation) {
  const fileIssue = _detectFileIssue(importation);
  return {
    ...importation,
    fileIssue,
    status: fileIssue ? Status.FILE_ISSUE : Status.READY
  };
}

function _detectFileIssue({ file }) {
  if (file.size === 0) return EMPTY_FILE;
  if (!VALID_FILE_TYPES.includes(file.type)) return INVALID_FILE_TYPE;
}

function run(importation, options) {
  if (!canRun(importation)) {
    throw new Error(`Cannot run importation: ${JSON.stringify(importation)}`);
  }

  return {
    runningImportation: { ...importation, status: Status.RUNNING },
    finishedImportationPromise: new Promise((resolve, reject) => {
      vcard
        .importFile(importation.file, options)
        .then(report => {
          resolve({
            ...importation,
            report,
            status: Status.fromReport(report)
          });
        })
        .catch(reject);
    })
  };
}

function canRun(importation) {
  return importation.status === Status.READY || canRetry(importation);
}

function canRetry(importation) {
  return _.get(importation, "report.unsaved") > 0;
}
