const _ = require("lodash");

export { isBlank, trimObject };

function isBlank(value) {
  if (_.isPlainObject(value) || _.isArray(value)) {
    return value.length === 0 || _.every(value, isBlank);
  }
  if (_.isString(value)) {
    return value.match(/^\s*$/) != null;
  }
  return value == null || value === false;
}

function trimObject(object) {
  return _.pickBy(object, _.negate(isBlank));
}
