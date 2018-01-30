import React from "react";

import "styles/intent";

import PickContacts from "components/PickContacts";

const arrToObj = (obj = {}, varval = ["var", "val"]) => {
  obj[varval[0]] = varval[1];
  return obj;
};

const getQueryParameter = () =>
  window.location.search
    .substring(1)
    .split("&")
    .map(varval => varval.split("="))
    .reduce(arrToObj, {});

const { intent: intentId } = getQueryParameter();

const IntentApp = () => (
  <div className="app-wrapper">
    <main className="app-content">
      <PickContacts intentId={intentId} />
    </main>
  </div>
);

export default IntentApp;
