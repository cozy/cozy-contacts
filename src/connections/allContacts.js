import { connect, withMutations } from "cozy-client";

const CONNECTION_NAME = "allContacts";

export const withContacts = component =>
  connect(client => client.all("io.cozy.contacts").UNSAFE_noLimit(), {
    as: CONNECTION_NAME
  })(component);

export const withContactsMutations = component =>
  withMutations(client => ({
    createContact: attributes =>
      client.create("io.cozy.contacts", attributes, null, {
        updateQueries: {
          [CONNECTION_NAME]: (previousData, result) => [
            ...previousData,
            result.data
          ]
        }
      }),
    updateContact: contact => client.save(contact),
    deleteContact: contact =>
      client.destroy(contact, {
        updateQueries: {
          [CONNECTION_NAME]: (previousData, result) => {
            const idx = previousData.findIndex(c => c.id === result.data.id);
            return [
              ...previousData.slice(0, idx),
              ...previousData.slice(idx + 1)
            ];
          }
        }
      })
  }))(component);
