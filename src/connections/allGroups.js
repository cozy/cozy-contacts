import { connect } from 'cozy-client'

const CONNECTION_NAME = 'allGroups'

export const withGroups = component =>
  connect(
    client => client.all('io.cozy.contacts.groups'),
    {
      as: CONNECTION_NAME
    }
  )(component)
