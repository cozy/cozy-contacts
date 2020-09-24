import React from 'react'
import PropTypes from 'prop-types'

import { ActionsOption } from 'cozy-ui/transpiled/react/SelectBox'

import EditGroupName from './EditGroupName'

const Option = props => {
  const { name: groupName, id: groupId } = props.data
  const {
    editedGroupId,
    setEditedGroupId,
    deleteGroup,
    renameGroup
  } = props.selectProps

  return editedGroupId === groupId ? (
    <EditGroupName
      groupId={groupId}
      groupName={groupName}
      setEditedGroupId={setEditedGroupId}
      renameGroup={renameGroup}
    />
  ) : (
    <ActionsOption
      {...props}
      withCheckbox
      actions={[
        {
          icon: 'pen',
          onClick: ({ data }) => setEditedGroupId(data.id)
        },
        {
          icon: 'trash',
          onClick: ({ data }) => deleteGroup(data)
        }
      ]}
    />
  )
}

Option.propTypes = {
  selectProps: PropTypes.shape({
    editedGroupId: PropTypes.string.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    setEditedGroupId: PropTypes.func.isRequired
  }),
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })
}

export default Option
