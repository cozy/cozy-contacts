import { connect, all } from "cozy-client";

const CONNECTION_NAME = "allGroups";

export const withGroups = component =>
  connect(all("io.cozy.contacts.groups"), { as: CONNECTION_NAME })(component);
