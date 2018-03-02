import { connect, all, withMutation, create, destroy } from "cozy-client";

const CONNECTION_NAME = "allContacts";

export const withContacts = component =>
  connect(all("io.cozy.contacts"), { as: CONNECTION_NAME })(component);

export const withCreation = component =>
  withMutation(create, {
    name: "createContact",
    updateQueries: {
      [CONNECTION_NAME]: (previousData, result) => [
        ...previousData,
        result.data[0]
      ]
    }
  })(component);

export const withDeletion = component =>
  withMutation(destroy, {
    name: "deleteContact",
    updateQueries: {
      [CONNECTION_NAME]: (previousData, result) => {
        const idx = previousData.findIndex(c => c.id === result.data[0].id);
        return [...previousData.slice(0, idx), ...previousData.slice(idx + 1)];
      }
    }
  })(component);
