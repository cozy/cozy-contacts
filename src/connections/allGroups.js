import { withMutations } from 'cozy-client'

const withGroupsMutations = withMutations(client => ({
  createGroup: attributes =>
    client.create('io.cozy.contacts.groups', attributes),
  updateGroup: group => client.save(group),
  deleteGroup: group => client.destroy(group)
}))

export default withGroupsMutations
