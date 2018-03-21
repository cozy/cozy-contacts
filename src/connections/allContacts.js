import {
  connect,
  withMutation,
  all,
  create,
  update,
  destroy
} from "cozy-client";

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

export const withUpdate = component =>
  withMutation(update, {
    name: "updateContact",
    updateQueries: {
      [CONNECTION_NAME]: (previousData, result) =>
        previousData.map(
          contact =>
            contact._id === result.data[0]._id ? result.data[0] : contact
        )
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
