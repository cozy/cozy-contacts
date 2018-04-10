import React from "react";

const connect = () => WrappedComponent => ({ ...props }) => (
  <WrappedComponent data={[]} fetchStatus={"ready"} {...props} />
);
const withMutations = whatever => WrappedComponent => ({ ...props }) => {
  const mockedMutatorProps = whatever({});
  return <WrappedComponent {...props} {...mockedMutatorProps} />;
};

exports.withMutations = withMutations;
exports.connect = connect;
