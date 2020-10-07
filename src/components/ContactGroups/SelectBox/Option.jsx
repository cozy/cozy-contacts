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
    renameGroup,
    isMulti
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
      withCheckbox={isMulti ? true : false}
      actions={[
        {
          icon: 'pen',
          onClick: ({ data }) => setEditedGroupId(data.id),
          iconProps: {
            'data-testid': `ActionsOption_${props.children}-icon_pen`
          }
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
