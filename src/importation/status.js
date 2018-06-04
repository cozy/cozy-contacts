// Possible states of an importation

import PropTypes from "prop-types";

const UNCONFIGURED = "UNCONFIGURED";
const FILE_ISSUE = "FILE_ISSUE";
const READY = "READY";
const RUNNING = "RUNNING";
const COMPLETE_SUCCESS = "COMPLETE_SUCCESS";
const PARTIAL_SUCCESS = "PARTIAL_SUCCESS";
const COMPLETE_FAILURE = "COMPLETE_FAILURE";

const propType = PropTypes.oneOf([
  COMPLETE_FAILURE,
  COMPLETE_SUCCESS,
  FILE_ISSUE,
  PARTIAL_SUCCESS,
  READY,
  RUNNING,
  UNCONFIGURED
]);

function fromReport({ imported, parseError, total }) {
  if (parseError || imported === 0) return COMPLETE_FAILURE;
  else if (imported === total) return COMPLETE_SUCCESS;
  else return PARTIAL_SUCCESS;
}

export default {
  COMPLETE_FAILURE,
  COMPLETE_SUCCESS,
  FILE_ISSUE,
  PARTIAL_SUCCESS,
  READY,
  RUNNING,
  UNCONFIGURED,
  fromReport,
  propType
};
