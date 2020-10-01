import React from 'react'
import PropTypes from 'prop-types'

import {
  ActionsOption,
  Option as DefaultOption
} from 'cozy-ui/transpiled/react/SelectBox'

import EditGroupName from './EditGroupName'

const Option = props => {
  const { name: groupName, id: groupId, withNoAction } = props.data
  const {
    editedGroupId,
    setEditedGroupId,
    deleteGroup,
    renameGroup,
    isMulti
  } = props.selectProps

  if (editedGroupId === groupId) {
    return (
      <EditGroupName
        groupId={groupId}
        groupName={groupName}
        setEditedGroupId={setEditedGroupId}
        renameGroup={renameGroup}
      />
    )
  }

  if (withNoAction) {
    return <DefaultOption {...props} />
  }

  return (
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
    id: PropTypes.string,
    withNoAction: PropTypes.bool
  })
}

export default Option
