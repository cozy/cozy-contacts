import { removeGroupFromAllContacts } from '../connections/allContacts'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import {
  buildContactGroupsTrashedQuery,
  buildContactsQueryByGroupId
} from '../queries/queries'

const cleanTrashedGroups = () => {
  return async (dispatch, getState, { client }) => {
    const contactGroupsTrashedQuery = buildContactGroupsTrashedQuery()

    const { data: trashedGroups } = await client.query(
      contactGroupsTrashedQuery.definition
    )
    for (const trashedGroup of trashedGroups) {
      await removeGroupFromAllContacts(client, trashedGroup._id)
      await client.destroy(trashedGroup)
    }

    dispatch({
      type: 'CLEAN_TRASHED_GROUPS',
      groups: trashedGroups
    })
  }
}



export default cleanTrashedGroups
