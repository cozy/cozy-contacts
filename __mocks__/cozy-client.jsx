import React from "react";

const connect = () => WrappedComponent => ({ ...props }) => (
  <WrappedComponent data={[]} fetchStatus={"ready"} {...props} />
);
const withMutation = (whatever, { name }) => WrappedComponent => ({
  ...props
}) => {
  const mockedMutatorProps = { [name]: () => {} };
  return <WrappedComponent {...props} {...mockedMutatorProps} />;
};
const all = () => {};

exports.withMutation = withMutation;
exports.connect = connect;
exports.all = all;
